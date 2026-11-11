document.documentElement.classList.add("js");
/* NexTrade Prime — Broker demo front-end.
   ACCOUNT CONFIG (demo defaults — Dawood changes them here; README explains).
   No real backend: auth is demo-only via localStorage. CRM integration point:
   replace demoAuth() with a POST to the CRM endpoint. */
const ACCOUNTS = {
  standard: { name: "Standard", min: "$10", spread: "from 1.0 pip", commission: "No commission", leverage: "1:500", lot: "0.01", swap: "Swap-free available", stopout: "20%" },
  raw: { name: "Raw Spread", min: "$100", spread: "from 0.0 pips", commission: "$3.50 per side, per lot", leverage: "1:500", lot: "0.01", swap: "Swap-free available", stopout: "20%" },
  pro: { name: "Pro", min: "$500", spread: "from 0.1 pips", commission: "No commission", leverage: "1:500", lot: "0.01", swap: "Swap-free available", stopout: "20%" }
};

/* ---------- header: mobile menu + mega menus on touch ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".main-nav>li>button").forEach(btn => {
    btn.addEventListener("click", e => {
      if (window.innerWidth <= 1020) { e.preventDefault(); btn.parentElement.classList.toggle("open"); }
    });
  });

  /* Escape closes any open mega-menu (and the mobile nav).
     Desktop menus open on :hover/:focus-within, which Escape cannot
     un-hover, so blur the focused item and suppress the menus via the
     .menus-esc-closed body class (see style.css) until the pointer or
     focus re-enters the nav. */
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".main-nav>li.open").forEach(li => li.classList.remove("open"));
    if (nav) nav.classList.remove("open");
    if (document.activeElement) document.activeElement.blur();
    document.body.classList.add("menus-esc-closed");
  });
  if (nav) {
    nav.addEventListener("mouseenter", () => document.body.classList.remove("menus-esc-closed"));
    nav.addEventListener("focusin", () => document.body.classList.remove("menus-esc-closed"));
  }

  /* ---------- scroll reveal (site-wide: every section & card) ---------- */
  /* Sections/cards without .reveal get it here, so the whole site animates.
     The .js gate in CSS keeps content visible if this script never runs. */
  document.querySelectorAll("section:not(.hero), .card, .split-img, .footer-grid > div")
    .forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- count-up stats ---------- */
  const cio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || (el.textContent.trim().startsWith("$") ? "$" : "");
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const start = performance.now(), dur = 1400;
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = prefix + (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: .4 });
  document.querySelectorAll("[data-count]").forEach(el => cio.observe(el));

  /* ---------- live prices (real public APIs, no key) ---------- */
  /* Sources (all free, no key):
     - BTC/USD + ETH/USD: CoinGecko simple price (real 24h % change)
     - EUR/USD, GBP/USD, USD/JPY: exchangerate-api v4 latest USD base.
       % change vs the previous business-day close from Frankfurter
       (api.frankfurter.dev/v1 — the old api.frankfurter.app host now
       301-redirects there, which is why the previous-close fetch used
       to fail silently in the browser).
     - XAU/USD: api.metals.live spot gold (no previous close published,
       so gold shows NO % change — never a fabricated one)
     - US30: Yahoo Finance chart API — Yahoo sends no CORS headers, so a
       browser fetch is blocked; US30 stays simulated.
     HONESTY RULES (fixed 2026-11-11 after QA caught fake daily moves):
     - % change is computed ONLY from a real previous close, on the SAME
       basis as the price: EUR/USD price = 1 / (EUR per USD), and its %
       = change in that inverted value vs the previous close's inverted
       value. The old code fell back to % vs a hard-coded session-open
       price from days earlier, which is how EUR/USD showed -3.56% and
       USD/JPY +3.03% in a single day. That fallback is gone: if no
       previous close is available, the % slot shows an em dash.
     - A symbol whose feed fails keeps the simulated jitter and a
       "Simulated" tag (data-live="sim") and never pretends to be live.
     - The strip reads "Live prices" ONLY when BOTH CoinGecko and
       ExchangeRate-API have actually loaded in this session; otherwise
       it reads "Simulated prices". Gold & US30 are simulated until
       their feeds connect.
     - Poll is every 15s so live prices visibly move; if any fetch is
       rate-limited (HTTP 429) the poll backs off to 60s until a clean
       poll succeeds. */
  const PRICES = {
    "EUR/USD": { p: 1.1637, d: 4, live: false, pct: null },
    "GBP/USD": { p: 1.3248, d: 4, live: false, pct: null },
    "XAU/USD": { p: 4231.40, d: 2, live: false, pct: null },
    "BTC/USD": { p: 97419, d: 0, live: false, pct: null },
    "ETH/USD": { p: 3420, d: 2, live: false, pct: null },
    "US30": { p: 44210, d: 0, live: false, pct: null },
    "USD/JPY": { p: 154.32, d: 2, live: false, pct: null }
  };
  const NOTE = document.getElementById("strip-note");
  const LIVE_SOURCES = [];
  function setNote() {
    if (!NOTE) return;
    const hasLive = LIVE_SOURCES.indexOf("CoinGecko") !== -1 && LIVE_SOURCES.indexOf("ExchangeRate-API") !== -1;
    if (hasLive) {
      NOTE.textContent = "Live prices";
      NOTE.title = "Live: " + LIVE_SOURCES.join(", ") + ". Gold & US30 simulated until their feeds connect.";
    } else {
      NOTE.textContent = "Simulated prices";
      NOTE.title = "Live feeds unreachable — showing simulated prices.";
    }
  }
  function renderPrices() {
    document.querySelectorAll("[data-symbol]").forEach(el => {
      const s = PRICES[el.dataset.symbol]; if (!s) return;
      el.querySelector(".val").textContent = s.p.toLocaleString(undefined, { minimumFractionDigits: s.d, maximumFractionDigits: s.d });
      const chg = el.querySelector(".chg");
      if (chg) {
        /* % only ever comes from a real previous close (see header).
           No previous close => no % at all, never a fabricated one. */
        if (s.pct !== null && s.pct !== undefined && isFinite(s.pct)) {
          const pct = s.pct;
          chg.textContent = (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
          chg.className = "chg " + (pct >= 0 ? "up" : "down");
        } else {
          chg.textContent = "—";
          chg.className = "chg na";
        }
      }
      el.dataset.live = s.live ? "live" : "sim";
    });
    const heroXau = document.getElementById("hero-xau");
    if (heroXau) heroXau.textContent = "$" + PRICES["XAU/USD"].p.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }
  function markLive(key, source) {
    if (!PRICES[key].live) { PRICES[key].live = true; if (LIVE_SOURCES.indexOf(source) === -1) LIVE_SOURCES.push(source); }
  }
  /* Set to true by fetchJSON on HTTP 429 so the poll loop backs off. */
  let rateLimited = false;
  async function fetchJSON(url, timeoutMs) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs || 8000);
    try {
      const r = await fetch(url, { signal: ctrl.signal });
      if (r.status === 429) { rateLimited = true; throw new Error("HTTP 429"); }
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } finally { clearTimeout(t); }
  }
  async function fetchCrypto() {
    try {
      const d = await fetchJSON("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true");
      if (d.bitcoin && d.bitcoin.usd) { PRICES["BTC/USD"].p = d.bitcoin.usd; PRICES["BTC/USD"].pct = d.bitcoin.usd_24h_change; markLive("BTC/USD", "CoinGecko"); }
      if (d.ethereum && d.ethereum.usd) { PRICES["ETH/USD"].p = d.ethereum.usd; PRICES["ETH/USD"].pct = d.ethereum.usd_24h_change; markLive("ETH/USD", "CoinGecko"); }
    } catch (e) { /* stays simulated */ }
  }
  /* Previous business-day close for FX, fetched once per session (and
     retried at most once an hour) — the % is derived from it, so it must
     never be re-fetched on every 15s poll. */
  let fxPrevRetryAt = 0;
  async function fetchFX() {
    try {
      const d = await fetchJSON("https://api.exchangerate-api.com/v4/latest/USD");
      if (d && d.rates) {
        /* Prices in pair units: EUR/USD = 1 / (EUR per USD), and the %
           is the change in that same inverted value vs the previous
           close's inverted value — never mixed bases. */
        const eurNow = d.rates.EUR ? 1 / d.rates.EUR : null;
        const gbpNow = d.rates.GBP ? 1 / d.rates.GBP : null;
        if (eurNow) PRICES["EUR/USD"].p = eurNow;
        if (gbpNow) PRICES["GBP/USD"].p = gbpNow;
        if (d.rates.JPY) PRICES["USD/JPY"].p = d.rates.JPY;
        if (Date.now() >= fxPrevRetryAt) {
          fxPrevRetryAt = Date.now() + 3600e3;
          for (let back = 1; back <= 5; back++) {
            try {
              const day = new Date(Date.now() - back * 864e5).toISOString().slice(0, 10);
              const prev = await fetchJSON("https://api.frankfurter.dev/v1/" + day + "?from=USD&to=EUR,GBP,JPY");
              if (prev && prev.rates) {
                if (eurNow && prev.rates.EUR) PRICES["EUR/USD"].pct = (eurNow / (1 / prev.rates.EUR) - 1) * 100;
                if (gbpNow && prev.rates.GBP) PRICES["GBP/USD"].pct = (gbpNow / (1 / prev.rates.GBP) - 1) * 100;
                if (d.rates.JPY && prev.rates.JPY) PRICES["USD/JPY"].pct = (d.rates.JPY / prev.rates.JPY - 1) * 100;
                break;
              }
            } catch (e) { /* try an earlier day; no % if none works */ }
          }
        }
        ["EUR/USD", "GBP/USD", "USD/JPY"].forEach(k => markLive(k, "ExchangeRate-API"));
      }
    } catch (e) { /* stays simulated */ }
  }
  async function fetchGold() {
    try {
      const d = await fetchJSON("https://api.metals.live/v1/spot/gold");
      const v = (d && typeof d.gold === "number") ? d.gold : (Array.isArray(d) && d[0] && typeof d[0].gold === "number" ? d[0].gold : null);
      if (v) { PRICES["XAU/USD"].p = v; markLive("XAU/USD", "metals.live"); }
    } catch (e) { /* stays simulated */ }
  }
  async function fetchUS30() {
    try {
      const d = await fetchJSON("https://query1.finance.yahoo.com/v8/finance/chart/%5EDJI?range=5d&interval=1d");
      const m = d && d.chart && d.chart.result && d.chart.result[0] && d.chart.result[0].meta;
      if (m && m.regularMarketPrice) {
        PRICES["US30"].p = m.regularMarketPrice;
        if (m.previousClose) PRICES["US30"].pct = (m.regularMarketPrice / m.previousClose - 1) * 100;
        markLive("US30", "Yahoo Finance");
      }
    } catch (e) { /* Yahoo blocks browser fetches (no CORS headers) — stays simulated */ }
  }
  async function fetchAllLive() {
    await Promise.all([fetchCrypto(), fetchFX(), fetchGold(), fetchUS30()]);
    renderPrices();
    setNote();
  }
  function jitter() {
    Object.keys(PRICES).forEach(k => {
      const s = PRICES[k];
      if (s.live) return; /* live symbols move only on the 15s API refresh */
      const vol = s.p * 0.0012;
      s.p = +(s.p + (Math.random() - 0.48) * vol).toFixed(s.d);
    });
    renderPrices();
  }
  /* marquee: duplicate the quote list once for a seamless loop */
  const track = document.getElementById("ticker-track");
  if (track && !track.dataset.dup) { track.innerHTML += track.innerHTML; track.dataset.dup = "1"; }
  /* Poll live prices every 15s so they visibly move; if any fetch was
     rate-limited (HTTP 429) back off to 60s until a clean poll succeeds. */
  let pollMs = 15000;
  async function pollLive() {
    rateLimited = false;
    await fetchAllLive();
    pollMs = rateLimited ? 60000 : 15000;
    setTimeout(pollLive, pollMs);
  }
  if (document.querySelector("[data-symbol]") || document.getElementById("hero-xau")) {
    renderPrices();
    pollLive();
    setInterval(jitter, 15000); /* simulated symbols tick at the same 15s cadence as the live feeds */
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => btn.parentElement.classList.toggle("open"));
  });

  /* ---------- calculators ---------- */
  const pipForm = document.getElementById("pip-calc");
  if (pipForm) pipForm.addEventListener("submit", e => {
    e.preventDefault();
    const pair = document.getElementById("pip-pair").value;
    const lots = parseFloat(document.getElementById("pip-lots").value || "1");
    const pipVal = pair === "XAU/USD" ? 1 : pair === "BTC/USD" ? 0.1 : 10;
    document.getElementById("pip-result").innerHTML =
      "Pip value for <b>" + lots + " lot of " + pair + "</b> = <b>$" + (pipVal * lots).toFixed(2) + " per pip</b>.";
  });
  const marginForm = document.getElementById("margin-calc");
  if (marginForm) marginForm.addEventListener("submit", e => {
    e.preventDefault();
    const lots = parseFloat(document.getElementById("mg-lots").value || "1");
    const price = parseFloat(document.getElementById("mg-price").value || "1");
    const lev = parseFloat(document.getElementById("mg-lev").value || "500");
    const margin = lots * 100000 * price / lev;
    document.getElementById("margin-result").innerHTML =
      "Required margin = <b>$" + margin.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "</b> at 1:" + lev + " leverage.";
  });

  /* ---------- demo auth (localStorage only) ---------- */
  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const pw = document.getElementById("login-password").value;
    if (!email.includes("@") || pw.length < 6) { alert("Enter a valid email and a password of at least 6 characters."); return; }
    localStorage.setItem("ntp_user", JSON.stringify({ email, name: email.split("@")[0] }));
    window.location.href = "dashboard.html";
  });
  const signupForm = document.getElementById("signup-form");
  if (signupForm) signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("su-name").value.trim();
    const email = document.getElementById("su-email").value.trim();
    const pw = document.getElementById("su-password").value;
    if (!name || !email.includes("@") || pw.length < 6) { alert("Fill in your name, a valid email and a password of at least 6 characters."); return; }
    localStorage.setItem("ntp_user", JSON.stringify({ email, name }));
    window.location.href = "dashboard.html";
  });
  const logout = document.getElementById("logout-btn");
  if (logout) logout.addEventListener("click", () => { localStorage.removeItem("ntp_user"); window.location.href = "login.html"; });
  const userName = document.getElementById("dash-user");
  if (userName) {
    try {
      const u = JSON.parse(localStorage.getItem("ntp_user") || "null");
      userName.textContent = u ? (u.name || u.email) : "Demo Trader";
      /* Logged in: the "log in to see your name here" banner no longer applies. */
      if (u) { const dn = document.querySelector(".demo-note"); if (dn) dn.remove(); }
    } catch (e) { userName.textContent = "Demo Trader"; }
  }
});
