# NexTrade Prime — Forex Broker Website (Demo Front-End)

Live demo: https://dawoodshah2232-svg.github.io/nextrade-prime-broker/
Repo: https://github.com/dawoodshah2232-svg/nextrade-prime-broker

A forex broker demo website for NexTrade Prime — **MT5 only**, with a demo
client area (login / signup / dashboard). No other platform is named
anywhere. No fake reviews, payout totals, client counts, awards, or
regulation/licence claims; the regulation page says plainly that no
regulator is named.

Company motto: **PAYOUT SPEED ABOVE ALL**

## Stack

- Vite + React (JSX) + react-router-dom
- Single global stylesheet: `src/style.css`
- Base path `/nextrade-prime-broker/` (GitHub Pages project site);
  build output is `dist/`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Deploy

Push to `main` → GitHub Actions builds the site and deploys `dist/` to
GitHub Pages. Workflow: `.github/workflows/deploy.yml` (checkout, Node 22,
`npm ci`, `npm run build`, upload `dist/` as the Pages artifact, deploy).
The Pages source is **GitHub Actions**.

## Project structure

```
index.html            # Vite entry (root)
vite.config.js        # base path /nextrade-prime-broker/
src/
  main.jsx            # router entry
  style.css           # single global stylesheet
  pages/              # one component per route
  components/         # shared UI (header, footer, …)
  lib/                # shared helpers (demo auth, prices, …)
public/
  assets/             # images, videos, logos (copied to dist/ as-is)
```

## Demo login (DEMO only)

- Email: `demo@nextradeprime.com`
- Password: `demo1234`

Auth is demo-only and stored in `localStorage`; there is no backend. Wire
the login/signup handlers in `src/lib/` to a real CRM endpoint before any
production use.

## History

The site was originally built as static HTML and converted to React
(Vite + JSX) in November 2026. Same design, same pages, same URLs, same
GitHub Pages address.
