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

  /* ---------- scroll reveal ---------- */
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

  /* ---------- live prices (simulated demo feed) ---------- */
  /* Session-open prices: % change is measured against the open, so the strip
     shows a real (simulated) day move instead of resetting to +0.00% each tick. */
  const PRICES = {
    "EUR/USD": { p: 1.1637, d: 4, o: 1.1598 }, "GBP/USD": { p: 1.3248, d: 4, o: 1.3180 },
    "XAU/USD": { p: 4231.40, d: 2, o: 4210.00 }, "BTC/USD": { p: 97419, d: 0, o: 96800 },
    "US30": { p: 44210, d: 0, o: 43950 }, "USD/JPY": { p: 154.32, d: 2, o: 153.90 }
  };
  function renderPrices() {
    document.querySelectorAll("[data-symbol]").forEach(el => {
      const s = PRICES[el.dataset.symbol]; if (!s) return;
      el.querySelector(".val").textContent = s.p.toLocaleString(undefined, { minimumFractionDigits: s.d, maximumFractionDigits: s.d });
      const chg = el.querySelector(".chg");
      if (chg) {
        const pct = ((s.p - s.o) / s.o * 100);
        chg.textContent = (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
        chg.className = "chg " + (pct >= 0 ? "up" : "down");
      }
    });
    const heroXau = document.getElementById("hero-xau");
    if (heroXau) heroXau.textContent = "$" + PRICES["XAU/USD"].p.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }
  function jitter() {
    Object.keys(PRICES).forEach(k => {
      const s = PRICES[k], vol = s.p * 0.0012;
      s.p = +(s.p + (Math.random() - 0.48) * vol).toFixed(s.d);
    });
    renderPrices();
  }
  if (document.querySelector("[data-symbol]") || document.getElementById("hero-xau")) {
    renderPrices();
    setInterval(jitter, 3000);
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
