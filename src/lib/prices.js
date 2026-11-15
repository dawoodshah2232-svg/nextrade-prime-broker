// Live prices for the whole site - one shared store, one polling loop.
//
// Source: TradingView's public quote scanner (scanner.tradingview.com). It
// is keyless and CORS-enabled; we POST as text/plain so the browser sends
// a "simple" request with no preflight. One request returns every symbol:
// last price, % change vs the previous close, day high/low and the feed's
// update mode ("streaming" = real-time, "delayed_streaming_600" = the
// exchange's 10-minute delay - US500 and NAS100 are only available
// delayed, and are flagged `delayed: true` so the UI can say so).
//
// Honesty rules (unchanged from the original script.js port):
//  - `live` per symbol is true only once a real quote has arrived.
//  - A symbol whose feed fails keeps the simulated jitter and a "SIM" tag.
//  - `pct` is a real change vs the previous close, or null (em dash).
//
// Poll: every 4s while the tab is visible, paused while hidden, backing
// off to 30s after a failed request until one succeeds again.

import { useEffect, useState } from "react";

// key -> TradingView ticker. Every ticker is in the scanner's "global"
// market, so one request covers them all.
export const TV_SYMBOLS = {
  "EUR/USD": "FX:EURUSD",
  "GBP/USD": "FX:GBPUSD",
  "AUD/USD": "FX:AUDUSD",
  "USD/JPY": "FX:USDJPY",
  "XAU/USD": "OANDA:XAUUSD",
  "XAG/USD": "TVC:SILVER",
  "BTC/USD": "BINANCE:BTCUSDT",
  "ETH/USD": "BINANCE:ETHUSDT",
  "LTC/USD": "BINANCE:LTCUSDT",
  "XRP/USD": "BINANCE:XRPUSDT",
  US30: "OANDA:US30USD",
  US500: "SP:SPX",
  NAS100: "NASDAQ:NDX",
  USOil: "FX:USOIL",
  UKOil: "FX:UKOIL",
  NGAS: "OANDA:NATGASUSD",
};

// Defaults shown before the first quote arrives.
// p = price, d = decimals, live = real quote received, pct = % change vs
// the previous close (null = unknown), hi/lo = day range, delayed = the
// feed is the exchange's 10-minute delayed stream.
export const PRICE_DEFAULTS = {
  "EUR/USD": { p: 1.1637, d: 5, live: false, pct: null },
  "GBP/USD": { p: 1.3248, d: 5, live: false, pct: null },
  "AUD/USD": { p: 0.6482, d: 5, live: false, pct: null },
  "XAU/USD": { p: 3880.0, d: 2, live: false, pct: null },
  "XAG/USD": { p: 48.5, d: 3, live: false, pct: null },
  "BTC/USD": { p: 64500, d: 2, live: false, pct: null },
  "ETH/USD": { p: 1810, d: 2, live: false, pct: null },
  "LTC/USD": { p: 44.7, d: 2, live: false, pct: null },
  "XRP/USD": { p: 0.95, d: 4, live: false, pct: null },
  US30: { p: 52200, d: 1, live: false, pct: null },
  US500: { p: 7560, d: 2, live: false, pct: null },
  NAS100: { p: 27940, d: 2, live: false, pct: null },
  "USD/JPY": { p: 159.7, d: 3, live: false, pct: null },
  USOil: { p: 89.1, d: 2, live: false, pct: null },
  UKOil: { p: 96.3, d: 2, live: false, pct: null },
  NGAS: { p: 3.09, d: 3, live: false, pct: null },
};

const SCAN_URL = "https://scanner.tradingview.com/global/scan";
const SOURCE = "market data feed";

// Live tick history per symbol (one point per successful poll), used by
// the hero sparklines. Kept in localStorage so a reload continues the
// line instead of starting empty; anything older than 15 minutes is
// discarded. All storage access is best-effort.
export const HISTORY_LEN = 90;
const HISTORY_KEY = "ntp-ticks-v1";
const history = {};
Object.keys(PRICE_DEFAULTS).forEach((k) => {
  history[k] = [];
});
try {
  const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || "null");
  if (saved && Date.now() - saved.t < 15 * 60e3 && saved.h) {
    Object.keys(history).forEach((k) => {
      if (Array.isArray(saved.h[k])) history[k] = saved.h[k].slice(-HISTORY_LEN);
    });
  }
} catch {
  /* storage unavailable - start empty */
}
function saveHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify({ t: Date.now(), h: history }));
  } catch {
    /* ignore */
  }
}

function cloneDefaults() {
  const out = {};
  Object.keys(PRICE_DEFAULTS).forEach((k) => {
    out[k] = { hi: null, lo: null, delayed: false, ...PRICE_DEFAULTS[k] };
  });
  return out;
}

export function formatPrice(p, d) {
  return p.toLocaleString(undefined, {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}

// The strip note: truthful about what is live right now.
export function priceNote(live, sources) {
  if (live) {
    return {
      text: "Live prices",
      title:
        "Real-time quotes. US500 and NAS100 use the exchange's 10-minute delayed feed.",
    };
  }
  return {
    text: "Connecting…",
    title: "Live feed not connected yet - showing the last known prices.",
  };
}

// --- module-level shared store (one polling loop for the whole app) ---
const prices = cloneDefaults();
const liveSources = [];
const listeners = new Set();
let started = false;
let anyLive = false;

function snapshot() {
  const copy = {};
  Object.keys(prices).forEach((k) => {
    copy[k] = { ...prices[k] };
  });
  const hist = {};
  Object.keys(history).forEach((k) => {
    hist[k] = history[k].slice();
  });
  return { prices: copy, history: hist, live: anyLive, sources: [...liveSources] };
}

function notify() {
  const snap = snapshot();
  listeners.forEach((l) => l(snap));
}

const tickerToKey = Object.fromEntries(
  Object.entries(TV_SYMBOLS).map(([k, t]) => [t, k]),
);

async function fetchQuotes() {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch(SCAN_URL, {
      method: "POST",
      // text/plain keeps this a CORS "simple request" (no preflight).
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        symbols: { tickers: Object.values(TV_SYMBOLS) },
        columns: ["close", "change", "high", "low", "update_mode"],
      }),
      signal: ctrl.signal,
    });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const json = await r.json();
    let got = 0;
    (json.data || []).forEach(({ s, d }) => {
      const key = tickerToKey[s];
      if (!key || !Array.isArray(d) || typeof d[0] !== "number") return;
      const q = prices[key];
      q.p = d[0];
      q.pct = typeof d[1] === "number" && isFinite(d[1]) ? d[1] : null;
      q.hi = typeof d[2] === "number" ? d[2] : null;
      q.lo = typeof d[3] === "number" ? d[3] : null;
      q.delayed = typeof d[4] === "string" && d[4].indexOf("delayed") === 0;
      q.live = true;
      got += 1;
    });
    if (got) {
      Object.keys(prices).forEach((k) => {
        if (!prices[k].live) return;
        history[k].push(prices[k].p);
        if (history[k].length > HISTORY_LEN) history[k].shift();
      });
      saveHistory();
      anyLive = true;
      if (liveSources.indexOf(SOURCE) === -1) liveSources.push(SOURCE);
    }
    return got > 0;
  } finally {
    clearTimeout(t);
  }
}

// Symbols that never received a real quote drift slightly so the page
// does not look frozen - they keep their "SIM" tag.
function jitter() {
  Object.keys(prices).forEach((k) => {
    const s = prices[k];
    if (s.live) return;
    const vol = s.p * 0.0004;
    s.p = +(s.p + (Math.random() - 0.5) * vol).toFixed(s.d);
  });
}

const POLL_MS = 4000;
const BACKOFF_MS = 30000;
let timer = null;
let inFlight = false;

async function poll() {
  if (inFlight) return;
  inFlight = true;
  timer = null;
  let ok = false;
  try {
    ok = await fetchQuotes();
  } catch {
    ok = false;
  }
  inFlight = false;
  if (!ok) jitter();
  notify();
  if (typeof document !== "undefined" && document.hidden) return; // resumes on visibilitychange
  timer = setTimeout(poll, ok ? POLL_MS : BACKOFF_MS);
}

function ensureStarted() {
  if (started) return;
  started = true;
  poll();
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && timer === null) poll();
    });
  }
}

// usePrices() -> { prices, history, live, sources }
// history: { 'EUR/USD': [p, p, …] } - live ticks, oldest first.
// prices: { 'EUR/USD': { p, d, live, pct, hi, lo, delayed }, … }
export function usePrices() {
  const [state, setState] = useState(snapshot);
  useEffect(() => {
    ensureStarted();
    listeners.add(setState);
    setState(snapshot());
    return () => {
      listeners.delete(setState);
    };
  }, []);
  return state;
}

export default usePrices;
