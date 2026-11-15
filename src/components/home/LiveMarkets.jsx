// Hero "Live markets" panel.
//  - Prices + tick history come from the shared live store (usePrices),
//    the same numbers as the ticker and the markets tabs.
//  - The chart is our own SVG: one point per live tick (every few
//    seconds), drawn across a fixed time window so the line grows
//    left-to-right, with a dashed previous-close reference when it falls
//    inside the visible range. No third-party widget or branding.
//  - Watchlist rows are buttons: clicking one makes it the featured
//    instrument. Prices flash green/red on every change.
import { useEffect, useId, useRef, useState } from 'react';
import { formatPrice, usePrices, HISTORY_LEN } from '../../lib/prices';

const WATCH = [
  { key: 'XAU/USD', name: 'Gold', ico: 'Au', cls: 'au' },
  { key: 'EUR/USD', name: 'Euro / Dollar', ico: '€', cls: 'fx' },
  { key: 'GBP/USD', name: 'Pound / Dollar', ico: '£', cls: 'fx' },
  { key: 'US30', name: 'Wall Street 30', ico: '30', cls: 'ix' },
  { key: 'BTC/USD', name: 'Bitcoin', ico: '₿', cls: 'btc' },
  { key: 'USOil', name: 'WTI Crude Oil', ico: 'OIL', cls: 'oil' },
];

// Flash class for 700ms whenever `value` changes.
function useFlash(value) {
  const prev = useRef(value);
  const [flash, setFlash] = useState('');
  useEffect(() => {
    if (prev.current === value) return undefined;
    setFlash(value > prev.current ? 'tick-up' : 'tick-down');
    prev.current = value;
    const t = setTimeout(() => setFlash(''), 700);
    return () => clearTimeout(t);
  }, [value]);
  return flash;
}

function Chg({ pct }) {
  if (pct == null) return <span className="lm-chg">-</span>;
  const up = pct >= 0;
  return (
    <span className={`lm-chg ${up ? 'up' : 'down'}`}>
      {up ? '▲' : '▼'} {Math.abs(pct).toFixed(2)}%
    </span>
  );
}

// Live tick chart. W x H viewBox; x = slot in a HISTORY_LEN-wide window.
function TickChart({ points, prevClose, up }) {
  const gid = useId().replace(/:/g, '');
  const W = 300;
  const H = 78;
  const pts = points.length ? points : [];
  let min = Math.min(...pts);
  let max = Math.max(...pts);
  if (!pts.length) {
    min = 0;
    max = 1;
  }
  // Pad the range so a flat market is a centred line, not a border.
  const pad = Math.max((max - min) * 0.18, Math.abs(max) * 0.00015, 1e-9);
  min -= pad;
  max += pad;
  const y = (v) => H - 6 - ((v - min) / (max - min)) * (H - 12);
  // The window starts at 16 slots and widens with each tick up to
  // HISTORY_LEN, so a fresh visit fills the chart within about a minute.
  const slots = Math.min(HISTORY_LEN, Math.max(16, pts.length));
  const step = W / (slots - 1);
  const xy = pts.map((v, i) => [i * step, y(v)]);
  const line = xy.map(([x, yy], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${yy.toFixed(1)}`).join(' ');
  const last = xy[xy.length - 1];
  const area = last ? `${line} L${last[0].toFixed(1)} ${H} L0 ${H} Z` : '';
  const showPrev = prevClose != null && prevClose > min && prevClose < max;
  const color = up ? '#2ecc8f' : '#ef5350';

  return (
    <div className="lm-chart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`a${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} className="lm-grid" x1="0" x2={W} y1={H * f} y2={H * f} />
        ))}
        {showPrev && (
          <line className="lm-prev" x1="0" x2={W} y1={y(prevClose)} y2={y(prevClose)} />
        )}
        {pts.length > 1 && (
          <>
            <path d={area} fill={`url(#a${gid})`} className="lm-area" />
            <path d={line} fill="none" stroke={color} className="lm-line" pathLength="1" />
          </>
        )}
      </svg>
      {last && (
        <span
          className="lm-head"
          style={{
            left: `${(last[0] / W) * 100}%`,
            top: `${(last[1] / H) * 100}%`,
            '--c': color,
          }}
        />
      )}
      {pts.length < 2 && <span className="lm-wait">Streaming live ticks…</span>}
    </div>
  );
}

function Feature({ w, q, points }) {
  const flash = useFlash(q.p);
  const hasRange = q.hi != null && q.lo != null && q.hi > q.lo;
  const pos = hasRange ? Math.min(100, Math.max(0, ((q.p - q.lo) / (q.hi - q.lo)) * 100)) : 50;
  const prevClose = q.pct != null ? q.p / (1 + q.pct / 100) : null;
  return (
    <div className="lm-feature">
      <div className="lm-f-head">
        <span className={`lm-ico lg ${w.cls}`}>{w.ico}</span>
        <span className="lm-id">
          <b>{w.key}</b>
          <small>
            {w.name}
            {q.delayed ? ' · 10 min delay' : ''}
          </small>
        </span>
        <Chg pct={q.pct} />
      </div>
      <div className={`lm-f-price ${flash}`}>{formatPrice(q.p, q.d)}</div>
      <TickChart points={points} prevClose={prevClose} up={(q.pct ?? 0) >= 0} />
      <div className="lm-range" aria-label="Day range">
        <span>L {hasRange ? formatPrice(q.lo, q.d) : '-'}</span>
        <div className="lm-range-bar">
          <i style={{ left: `${pos}%` }} />
        </div>
        <span>H {hasRange ? formatPrice(q.hi, q.d) : '-'}</span>
      </div>
    </div>
  );
}

function Row({ w, q, active, onSelect, i }) {
  const flash = useFlash(q.p);
  return (
    <button
      type="button"
      className={`lm-row ${active ? 'active' : ''}`}
      onClick={onSelect}
      aria-pressed={active}
      style={{ animationDelay: `${0.7 + i * 0.07}s` }}
    >
      <span className={`lm-ico ${w.cls}`}>{w.ico}</span>
      <span className="lm-id">
        <b>{w.key}</b>
        <small>{w.name}</small>
      </span>
      <span className={`lm-px ${flash}`}>{formatPrice(q.p, q.d)}</span>
      <Chg pct={q.pct} />
    </button>
  );
}

export default function LiveMarkets() {
  const { prices, history, live } = usePrices();
  const [sel, setSel] = useState(WATCH[0].key);
  const w = WATCH.find((x) => x.key === sel);

  return (
    <aside className="live-markets" aria-label="Live market prices">
      <div className="lm-top">
        <span className="lm-title">Live markets</span>
        <span className={`lm-status ${live ? 'live' : ''}`}>
          <i />
          {live ? 'Live' : 'Connecting'}
        </span>
      </div>

      <Feature key={sel} w={w} q={prices[sel]} points={history[sel] || []} />

      <div className="lm-list">
        {WATCH.map((x, i) => (
          <Row
            key={x.key}
            w={x}
            q={prices[x.key]}
            i={i}
            active={x.key === sel}
            onSelect={() => setSel(x.key)}
          />
        ))}
      </div>
    </aside>
  );
}
