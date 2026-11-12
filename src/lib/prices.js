// Live prices — ported from the old assets/script.js (lines ~103-298).
// Same sources, same instrument list, same honesty rules:
//  - BTC/USD + ETH/USD: CoinGecko simple price (real 24h % change).
//  - EUR/USD, GBP/USD, USD/JPY, AUD/USD: exchangerate-api v4 (USD base).
//    % change vs the previous business-day close from Frankfurter
//    (api.frankfurter.dev/v1), on the SAME basis as the price
//    (EUR/USD price = 1 / EUR-per-USD, % = change in that inverted value).
//  - XAU/USD: api.metals.live spot gold (no previous close published, so
//    gold shows NO % change — never a fabricated one).
//  - US30: Yahoo Finance chart API — Yahoo sends no CORS headers, so a
//    browser fetch is blocked; US30 stays simulated.
//  - A symbol whose feed fails keeps the simulated jitter and a
//    "Simulated" tag (live: false) and never pretends to be live.
//  - `live` is true ONLY when BOTH CoinGecko and ExchangeRate-API have
//    actually loaded in this session; gold & US30 are simulated until
//    their feeds connect.
//  - Poll is every 15s; on HTTP 429 the poll backs off to 60s until a
//    clean poll succeeds. Simulated symbols jitter at the same 15s cadence.
//
// The polling loop is module-level and shared: any number of components
// may call usePrices() and only one loop ever runs.

import { useEffect, useState } from 'react';

// Defaults shown before the first feed response (verbatim from script.js).
// p = price, d = decimals, live = real feed connected, pct = % change vs a
// real previous close (null = no previous close available, show an em dash).
export const PRICE_DEFAULTS = {
  'EUR/USD': { p: 1.1637, d: 4, live: false, pct: null },
  'GBP/USD': { p: 1.3248, d: 4, live: false, pct: null },
  'AUD/USD': { p: 0.6482, d: 4, live: false, pct: null },
  'XAU/USD': { p: 4231.4, d: 2, live: false, pct: null },
  'XAG/USD': { p: 31.42, d: 2, live: false, pct: null },
  'BTC/USD': { p: 97419, d: 0, live: false, pct: null },
  'ETH/USD': { p: 3420, d: 2, live: false, pct: null },
  'LTC/USD': { p: 92.4, d: 2, live: false, pct: null },
  'XRP/USD': { p: 0.542, d: 4, live: false, pct: null },
  US30: { p: 44210, d: 0, live: false, pct: null },
  US500: { p: 6012, d: 0, live: false, pct: null },
  NAS100: { p: 21480, d: 0, live: false, pct: null },
  'USD/JPY': { p: 154.32, d: 2, live: false, pct: null },
  USOil: { p: 68.4, d: 2, live: false, pct: null },
  UKOil: { p: 72.85, d: 2, live: false, pct: null },
  NGAS: { p: 3.21, d: 2, live: false, pct: null },
};

function cloneDefaults() {
  const out = {};
  Object.keys(PRICE_DEFAULTS).forEach((k) => {
    out[k] = { ...PRICE_DEFAULTS[k] };
  });
  return out;
}

export function formatPrice(p, d) {
  return p.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
}

// The strip note, worded exactly as the old site showed it.
export function priceNote(live, sources) {
  if (live) {
    return {
      text: 'Live prices',
      title: 'Live: ' + sources.join(', ') + '. Gold & US30 simulated until their feeds connect.',
    };
  }
  return {
    text: 'Simulated prices',
    title: 'Live feeds unreachable — showing simulated prices.',
  };
}

// --- module-level shared store (one polling loop for the whole app) ---
const prices = cloneDefaults();
const liveSources = [];
const listeners = new Set();
let started = false;
let rateLimited = false;
let fxPrevRetryAt = 0;

function isLive() {
  return liveSources.indexOf('CoinGecko') !== -1 && liveSources.indexOf('ExchangeRate-API') !== -1;
}

function snapshot() {
  const copy = {};
  Object.keys(prices).forEach((k) => {
    copy[k] = { ...prices[k] };
  });
  return { prices: copy, live: isLive(), sources: [...liveSources] };
}

function notify() {
  const snap = snapshot();
  listeners.forEach((l) => l(snap));
}

function markLive(key, source) {
  if (!prices[key].live) {
    prices[key].live = true;
    if (liveSources.indexOf(source) === -1) liveSources.push(source);
  }
}

async function fetchJSON(url, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs || 8000);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (r.status === 429) {
      rateLimited = true;
      throw new Error('HTTP 429');
    }
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

async function fetchCrypto() {
  try {
    const d = await fetchJSON(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
    );
    if (d.bitcoin && d.bitcoin.usd) {
      prices['BTC/USD'].p = d.bitcoin.usd;
      prices['BTC/USD'].pct = d.bitcoin.usd_24h_change;
      markLive('BTC/USD', 'CoinGecko');
    }
    if (d.ethereum && d.ethereum.usd) {
      prices['ETH/USD'].p = d.ethereum.usd;
      prices['ETH/USD'].pct = d.ethereum.usd_24h_change;
      markLive('ETH/USD', 'CoinGecko');
    }
  } catch {
    /* stays simulated */
  }
}

async function fetchFX() {
  try {
    const d = await fetchJSON('https://api.exchangerate-api.com/v4/latest/USD');
    if (d && d.rates) {
      const eurNow = d.rates.EUR ? 1 / d.rates.EUR : null;
      const gbpNow = d.rates.GBP ? 1 / d.rates.GBP : null;
      const audNow = d.rates.AUD ? 1 / d.rates.AUD : null;
      if (eurNow) prices['EUR/USD'].p = eurNow;
      if (gbpNow) prices['GBP/USD'].p = gbpNow;
      if (audNow) prices['AUD/USD'].p = audNow;
      if (d.rates.JPY) prices['USD/JPY'].p = d.rates.JPY;
      // Previous business-day close, fetched once per session (retried at
      // most once an hour) — never re-fetched on every 15s poll.
      if (Date.now() >= fxPrevRetryAt) {
        fxPrevRetryAt = Date.now() + 3600e3;
        for (let back = 1; back <= 5; back++) {
          try {
            const day = new Date(Date.now() - back * 864e5).toISOString().slice(0, 10);
            const prev = await fetchJSON(
              'https://api.frankfurter.dev/v1/' + day + '?from=USD&to=EUR,GBP,JPY,AUD',
            );
            if (prev && prev.rates) {
              if (eurNow && prev.rates.EUR)
                prices['EUR/USD'].pct = (eurNow / (1 / prev.rates.EUR) - 1) * 100;
              if (gbpNow && prev.rates.GBP)
                prices['GBP/USD'].pct = (gbpNow / (1 / prev.rates.GBP) - 1) * 100;
              if (audNow && prev.rates.AUD)
                prices['AUD/USD'].pct = (audNow / (1 / prev.rates.AUD) - 1) * 100;
              if (d.rates.JPY && prev.rates.JPY)
                prices['USD/JPY'].pct = (d.rates.JPY / prev.rates.JPY - 1) * 100;
              break;
            }
          } catch {
            /* try an earlier day; no % if none works */
          }
        }
      }
      ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'].forEach((k) =>
        markLive(k, 'ExchangeRate-API'),
      );
    }
  } catch {
    /* stays simulated */
  }
}

async function fetchGold() {
  try {
    const d = await fetchJSON('https://api.metals.live/v1/spot/gold');
    const v =
      d && typeof d.gold === 'number'
        ? d.gold
        : Array.isArray(d) && d[0] && typeof d[0].gold === 'number'
          ? d[0].gold
          : null;
    if (v) {
      prices['XAU/USD'].p = v;
      markLive('XAU/USD', 'metals.live');
    }
  } catch {
    /* stays simulated */
  }
}

async function fetchUS30() {
  try {
    const d = await fetchJSON(
      'https://query1.finance.yahoo.com/v8/finance/chart/%5EDJI?range=5d&interval=1d',
    );
    const m = d && d.chart && d.chart.result && d.chart.result[0] && d.chart.result[0].meta;
    if (m && m.regularMarketPrice) {
      prices.US30.p = m.regularMarketPrice;
      if (m.previousClose) prices.US30.pct = (m.regularMarketPrice / m.previousClose - 1) * 100;
      markLive('US30', 'Yahoo Finance');
    }
  } catch {
    /* Yahoo blocks browser fetches (no CORS headers) — stays simulated */
  }
}

async function fetchAllLive() {
  await Promise.all([fetchCrypto(), fetchFX(), fetchGold(), fetchUS30()]);
  notify();
}

function jitter() {
  Object.keys(prices).forEach((k) => {
    const s = prices[k];
    if (s.live) return; // live symbols move only on the 15s API refresh
    const vol = s.p * 0.0012;
    s.p = +(s.p + (Math.random() - 0.48) * vol).toFixed(s.d);
  });
  notify();
}

let pollMs = 15000;
async function pollLive() {
  rateLimited = false;
  await fetchAllLive();
  pollMs = rateLimited ? 60000 : 15000;
  setTimeout(pollLive, pollMs);
}

function ensureStarted() {
  if (started) return;
  started = true;
  pollLive();
  setInterval(jitter, 15000);
}

// usePrices() → { prices, live, sources }
// prices: { 'EUR/USD': { p, d, live, pct }, … } — render p with
// formatPrice(p, d); pct is null when no real previous close exists
// (render an em dash, never a fabricated %). live: true only when both
// CoinGecko and ExchangeRate-API have loaded this session.
export function usePrices() {
  const [state, setState] = useState(snapshot);
  useEffect(() => {
    ensureStarted();
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);
  return state;
}

export default usePrices;
