// Hero "Live markets" panel - real tick-by-tick prices over Binance's public
// market-data WebSocket (no API key, CORS-free). Sparklines are seeded from
// the last 24h of 30-minute candles (REST) and extended by every live tick.
//   XAU/USD  <- PAXGUSDT (PAX Gold: 1 token = 1 troy oz of LBMA gold, so it
//              tracks spot gold; the tooltip says so - never passed off as
//              an interbank quote)
//   EUR/USD  <- EURUSDT
//   BTC/USD  <- BTCUSDT
//   ETH/USD  <- ETHUSDT
// % change is Binance's rolling 24h change. If the socket cannot connect the
// cards show the last REST snapshot with a "Delayed" tag, and reconnect with
// backoff. One socket per mounted panel; closed on unmount.
import { useEffect, useRef, useState } from 'react';

const MARKETS = [
  { sym: 'PAXGUSDT', label: 'XAU/USD', name: 'Gold', d: 2, prefix: '$', note: 'Gold price via the PAXG/USDT live feed' },
  { sym: 'EURUSDT', label: 'EUR/USD', name: 'Euro', d: 4, prefix: '', note: 'EUR/USDT live feed' },
  { sym: 'BTCUSDT', label: 'BTC/USD', name: 'Bitcoin', d: 0, prefix: '$', note: 'BTC/USDT live feed' },
  { sym: 'ETHUSDT', label: 'ETH/USD', name: 'Ethereum', d: 2, prefix: '$', note: 'ETH/USDT live feed' },
];

const REST = 'https://data-api.binance.vision/api/v3';
const WS = 'wss://data-stream.binance.vision/stream?streams=';
const MAX_POINTS = 60;

const fmt = (p, d) =>
  p.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });

function Sparkline({ points, up }) {
  if (points.length < 2) return <svg className="lm-spark" viewBox="0 0 100 32" aria-hidden="true" />;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const xy = points.map((v, i) => [
    (i / (points.length - 1)) * 100,
    30 - ((v - min) / span) * 28,
  ]);
  const line = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const area = `${line} L100 32 L0 32 Z`;
  const id = up ? 'lmUp' : 'lmDown';
  const [lx, ly] = xy[xy.length - 1];
  return (
    <svg className="lm-spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={up ? '#2ecc8f' : '#ef5350'} stopOpacity="0.35" />
          <stop offset="100%" stopColor={up ? '#2ecc8f' : '#ef5350'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path className="lm-line" d={line} fill="none" vectorEffect="non-scaling-stroke" />
      <circle className="lm-dot" cx={lx} cy={ly} r="1.6" />
    </svg>
  );
}

function Card({ m, q, i }) {
  const prev = useRef(q.price);
  const [flash, setFlash] = useState('');
  useEffect(() => {
    if (q.price == null || prev.current == null) {
      prev.current = q.price;
      return;
    }
    if (q.price !== prev.current) {
      setFlash(q.price > prev.current ? 'tick-up' : 'tick-down');
      prev.current = q.price;
      const t = setTimeout(() => setFlash(''), 700);
      return () => clearTimeout(t);
    }
  }, [q.price]);

  const up = (q.pct ?? 0) >= 0;
  return (
    <div className={`lm-card ${up ? 'is-up' : 'is-down'}`} style={{ animationDelay: `${0.45 + i * 0.12}s` }} title={m.note}>
      <div className="lm-head">
        <span className="lm-sym">{m.label}</span>
        <span className="lm-name">{m.name}</span>
        <span className={`lm-chg ${up ? 'up' : 'down'}`}>
          {q.pct == null ? '-' : `${up ? '▲' : '▼'} ${Math.abs(q.pct).toFixed(2)}%`}
        </span>
      </div>
      <div className="lm-row">
        <span className={`lm-price ${flash}`}>
          {q.price == null ? <span className="lm-skel" /> : `${m.prefix}${fmt(q.price, m.d)}`}
        </span>
        <Sparkline points={q.spark} up={up} />
      </div>
    </div>
  );
}

export default function LiveMarkets() {
  const [quotes, setQuotes] = useState(() =>
    Object.fromEntries(MARKETS.map((m) => [m.sym, { price: null, pct: null, spark: [] }])),
  );
  const [status, setStatus] = useState('connecting'); // connecting | live | delayed

  useEffect(() => {
    let ws = null;
    let alive = true;
    let retry = 0;
    let retryTimer = null;
    // Throttle React updates to one paint per animation frame.
    const pending = {};
    let raf = 0;
    const flush = () => {
      raf = 0;
      const batch = { ...pending };
      Object.keys(pending).forEach((k) => delete pending[k]);
      setQuotes((prev) => {
        const next = { ...prev };
        Object.entries(batch).forEach(([sym, t]) => {
          const cur = next[sym];
          const spark = cur.spark.length ? [...cur.spark.slice(0, -1), t.price] : [t.price];
          next[sym] = { price: t.price, pct: t.pct, spark };
        });
        return next;
      });
    };

    // Seed: 24h snapshot + 30m candles for the sparklines.
    const seed = async () => {
      try {
        const syms = encodeURIComponent(JSON.stringify(MARKETS.map((m) => m.sym)));
        const [tick, ...klines] = await Promise.all([
          fetch(`${REST}/ticker/24hr?symbols=${syms}`).then((r) => r.json()),
          ...MARKETS.map((m) =>
            fetch(`${REST}/klines?symbol=${m.sym}&interval=30m&limit=48`).then((r) => r.json()),
          ),
        ]);
        if (!alive || !Array.isArray(tick)) return;
        setQuotes((prev) => {
          const next = { ...prev };
          MARKETS.forEach((m, i) => {
            const t = tick.find((x) => x.symbol === m.sym);
            const spark = Array.isArray(klines[i]) ? klines[i].map((k) => +k[4]) : [];
            if (t) {
              const price = +t.lastPrice;
              next[m.sym] = {
                price: prev[m.sym].price ?? price,
                pct: prev[m.sym].pct ?? +t.priceChangePercent,
                spark: spark.length ? [...spark, price] : [price],
              };
            }
          });
          return next;
        });
      } catch {
        /* the socket may still connect */
      }
    };

    const connect = () => {
      if (!alive) return;
      const streams = MARKETS.map((m) => `${m.sym.toLowerCase()}@miniTicker`).join('/');
      ws = new WebSocket(WS + streams);
      ws.onopen = () => {
        retry = 0;
        setStatus('live');
      };
      ws.onmessage = (e) => {
        try {
          const { data } = JSON.parse(e.data);
          if (!data || !data.s) return;
          const c = +data.c;
          const o = +data.o;
          pending[data.s] = { price: c, pct: o ? ((c - o) / o) * 100 : null };
          if (!raf) raf = requestAnimationFrame(flush);
        } catch {
          /* ignore malformed frame */
        }
      };
      ws.onclose = () => {
        if (!alive) return;
        setStatus('delayed');
        retry += 1;
        retryTimer = setTimeout(connect, Math.min(30000, 1500 * 2 ** retry));
      };
      ws.onerror = () => ws && ws.close();
    };

    seed();
    connect();

    // Extend sparklines: every 30s push the latest price as a new point.
    const grow = setInterval(() => {
      setQuotes((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          const q = next[k];
          if (q.price != null) next[k] = { ...q, spark: [...q.spark, q.price].slice(-MAX_POINTS) };
        });
        return next;
      });
    }, 30000);

    return () => {
      alive = false;
      clearInterval(grow);
      clearTimeout(retryTimer);
      if (raf) cancelAnimationFrame(raf);
      if (ws) {
        ws.onclose = null;
        ws.close();
      }
    };
  }, []);

  return (
    <aside className="live-markets" aria-label="Live market prices">
      <div className="lm-top">
        <span className="lm-title">Live markets</span>
        <span className={`lm-status ${status}`}>
          <i />
          {status === 'live' ? 'Live' : status === 'delayed' ? 'Delayed' : 'Connecting'}
        </span>
      </div>
      {MARKETS.map((m, i) => (
        <Card key={m.sym} m={m} q={quotes[m.sym]} i={i} />
      ))}
      <div className="lm-foot">Real-time quotes · 24h change</div>
    </aside>
  );
}
