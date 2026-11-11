# NexTrade Prime — Forex Broker Website (Demo Front-End)

Live demo: https://dawoodshah2232-svg.github.io/nextrade-prime-broker/
Repo: https://github.com/dawoodshah2232-svg/nextrade-prime-broker

A clean, XM-style forex broker website for NexTrade Prime. This is a **fresh build from scratch** — the rejected prop-firm site (`nextrade-prime`) was left completely alone; nothing was copied from it.

## Design
- XM-clean: white / light-grey body, dark navy hero + footer only, ONE gold accent (#C9A227 / #E8C766) matching the NexTrade logo.
- Inter + system stack. Sticky white header with mega-menus, cinematic navy hero with a real trader photo, live price strip, count-up stats, scroll-reveal, FAQ accordion.
- Logos (exact supplied files, never redrawn): `assets/logo-dark.png` (navy, light backgrounds — used in the white header) and `assets/logo-light.png` (white/silver, dark backgrounds — hero/footer/login).

## Pages (26 — every link works)
index, accounts, demo-account, islamic-accounts, deposits-withdrawals, markets, markets-forex, markets-metals, markets-indices, markets-crypto, markets-energies, platforms, platforms-mt5, education, economic-calendar, calculators, news-analysis, promotions, about, regulation, contact, help-centre, faq, login, signup, dashboard (demo client area).

## Accounts (demo defaults — change them in `assets/script.js`, `ACCOUNTS` config)
| Account | Min deposit | Spread from | Commission | Leverage |
|---|---|---|---|---|
| Standard | $10 | 1.0 pip | None | 1:500 |
| Raw Spread | $100 | 0.0 pips | $3.50 / side / lot | 1:500 |
| Pro | $500 | 0.1 pips | None | 1:500 |

All accounts: min lot 0.01, stop-out 20%, swap-free available, EAs allowed, negative-balance protection, hedging allowed.

## Platforms — MT5 ONLY
No MT4, cTrader, TradingView or any other platform is named anywhere. Real MetaTrader 5 logo hotlinked from https://www.metatrader5.com/i/metatrader-5-logo.png (official MetaQuotes), on a white chip.

## Images (all browser-verified, 200)
- `photo-1716279083176-60af7a63cb03` — woman at desk, candlestick + order book
- `photo-1579226905180-636b76d96082` — man at round table, two laptops with charts (hero)
- `photo-1579225663317-c0251b4369bc` — young man at desk, candlestick charts
- `photo-1519389950473-47ba0277781c` — top-down desk, laptops/coffee/headphones
- `photo-1611974789855-9c2a0a7236a3` — candlestick chart close-up
- `photo-1642790106117-e829e14a795f` — MT5 terminal laptop + phone

## Honesty
- NO prop-firm content anywhere (no challenges, funded accounts, evaluations).
- NO fake Trustpilot score, client counts, awards, payout totals, or regulation/licence claim (no regulator name is published — the regulation page says so plainly).
- Risk warning on every page. Auth is demo-only (localStorage); login/signup lead to the demo dashboard.

## CRM integration point
`assets/script.js` — `demoAuth` behaviour in the login/signup submit handlers. Replace the localStorage demo login with a POST to the CRM endpoint; form IDs are `login-form`, `signup-form`, `login-email`, `login-password`, `su-name`, `su-email`, `su-password`, `su-account`.

## Deploy
Static site, GitHub Pages from `main`. Pushed via the GitHub API (exec child-process writes are blocked on this VM, so local git is unusable).
