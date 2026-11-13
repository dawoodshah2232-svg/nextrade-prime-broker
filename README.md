# NexTrade Prime — Forex Broker Website (Demo Front-End)

Live: https://nextradeprime.com/
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
- Base path `/` (served from the domain root); build output is `dist/`

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

Push to `main` (or run the workflow manually) → GitHub Actions builds the
site and rsyncs **only the contents of `dist/`** over SSH to cPanel
(`public_html/nextradeprime.com`). Workflow: `.github/workflows/deploy.yml`.
Client-side routes are served by `public/.htaccess` (copied into `dist/`).

Repository secrets (Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `CPANEL_HOST` | cPanel server host / IP |
| `CPANEL_USER` | cPanel username |
| `CPANEL_PORT` | SSH port (optional, defaults to 22) |
| `CPANEL_TARGET` | `public_html/nextradeprime.com` |
| `CPANEL_SSH_KEY` | full private key (authorized in cPanel → SSH Access) |
| `CPANEL_SSH_PASSPHRASE` | the key's passphrase (only if it has one) |

## Project structure

```
index.html            # Vite entry shell (the only HTML file)
vite.config.js        # base path /, dev server on 5173 (next free port if busy)
src/
  main.jsx            # router entry
  style.css           # single global stylesheet
  pages/              # one component per route
  components/         # shared UI (header, footer, …)
  lib/                # shared helpers (demo auth, prices, …)
public/
  .htaccess           # Apache: HTTPS, no-www, SPA route fallback, caching
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
(Vite + JSX) in November 2026. Same design, same pages, same URLs. Hosting
moved from GitHub Pages to cPanel (nextradeprime.com).
