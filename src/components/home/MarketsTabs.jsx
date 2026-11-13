// "One account. Every market." - five tabs with split panels, verbatim
// port of the old index.html #markets section. Tab switching is React
// state (the old script.js toggled .active / hidden - same result).
// Snapshot rows are driven by usePrices: the value is formatPrice(p, d),
// the % change shows an em dash when pct is null (never fabricated), and
// the LIVE/SIM tag tracks the real feed state per symbol. Tab icons are
// inlined verbatim (stroke currentColor on the buttons, #e8c766 in the
// snapshot headers) - MIcon's .m-ico wrapper and #c9a227 stroke would
// restyle them.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, usePrices } from '../../lib/prices';

// Icon path fragments, verbatim from the old markup (same paths, different
// stroke colour per context - buttons use currentColor, snapshot headers
// use #e8c766).
const PATHS = {
  forex: <path d="M4 7h13M17 4l3 3-3 3M20 17H7M7 14l-3 3 3 3" />,
  metals: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </>
  ),
  indices: <path d="M3 21h18M7 21v-7M12 21V8M17 21v-4" />,
  crypto: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 8h3.5a2.5 2.5 0 0 1 0 5H9.5zM9.5 13H13a2.5 2.5 0 0 1 0 5H9.5zM11 6v2M11 16v2M13.5 6v2M13.5 16v2" />
    </>
  ),
  energies: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  droplet: <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z" />,
  bars: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
};

function TabSvg({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

function SideSvg({ name, width }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e8c766"
      strokeWidth={width || '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

function FlagIco({ code }) {
  return (
    <span className="mp-ico">
      <img src={'https://flagcdn.com/w80/' + code + '.png'} alt="" />
    </span>
  );
}

function GlyphIco({ cls, children }) {
  return (
    <span className={'mp-ico mp-glyph ' + cls}>{children}</span>
  );
}

function SvgIco({ name, width }) {
  return (
    <span className="mp-ico">
      <SideSvg name={name} width={width} />
    </span>
  );
}

const TABS = [
  {
    id: 'forex',
    label: 'Forex',
    text: '60+ currency pairs, from the majors to the crosses. Spreads from 0.0 pips on ECN, leverage up to 1:1000, minimum trade 0.01 lots.',
    chips: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF', 'NZD/USD'],
    linkTo: '/markets/forex',
    linkLabel: 'Explore Forex',
    snapshot: 'Forex snapshot',
    rows: [
      { symbol: 'EUR/USD', ico: <FlagIco code="eu" /> },
      { symbol: 'GBP/USD', ico: <FlagIco code="gb" /> },
      { symbol: 'USD/JPY', ico: <FlagIco code="us" /> },
      { symbol: 'AUD/USD', ico: <FlagIco code="au" /> },
    ],
  },
  {
    id: 'metals',
    label: 'Metals',
    text: 'Gold and silver against the dollar - the classic hedge, traded around the clock with no expiry.',
    chips: ['XAU/USD', 'XAG/USD'],
    linkTo: '/markets/metals',
    linkLabel: 'Explore Metals',
    snapshot: 'Metals snapshot',
    rows: [
      { symbol: 'XAU/USD', ico: <GlyphIco cls="mp-au">Au</GlyphIco> },
      { symbol: 'XAG/USD', ico: <GlyphIco cls="mp-ag">Ag</GlyphIco> },
    ],
  },
  {
    id: 'indices',
    label: 'Indices',
    text: 'Trade whole markets in one position - US, UK and European benchmarks, cash indices with no expiry.',
    chips: ['US30', 'US500', 'NAS100', 'UK100', 'GER40'],
    linkTo: '/markets/indices',
    linkLabel: 'Explore Indices',
    snapshot: 'Indices snapshot',
    rows: [
      { symbol: 'US30', ico: <SvgIco name="bars" width="2.2" /> },
      { symbol: 'US500', ico: <SvgIco name="bars" width="2.2" /> },
      { symbol: 'NAS100', ico: <SvgIco name="bars" width="2.2" /> },
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    text: 'Bitcoin, Ethereum and more as CFDs - long or short, 24/7, without a wallet.',
    chips: ['BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD'],
    linkTo: '/markets/crypto',
    linkLabel: 'Explore Crypto',
    snapshot: 'Crypto snapshot',
    rows: [
      { symbol: 'BTC/USD', ico: <GlyphIco cls="mp-btc">₿</GlyphIco> },
      { symbol: 'ETH/USD', ico: <GlyphIco cls="mp-eth">Ξ</GlyphIco> },
      { symbol: 'LTC/USD', ico: <GlyphIco cls="mp-ltc">Ł</GlyphIco> },
      { symbol: 'XRP/USD', ico: <GlyphIco cls="mp-xrp">X</GlyphIco> },
    ],
  },
  {
    id: 'energies',
    label: 'Energies',
    text: 'Oil and natural gas - the markets that move on supply, weather and geopolitics.',
    chips: ['USOil', 'UKOil', 'NGAS'],
    linkTo: '/markets/energies',
    linkLabel: 'Explore Energies',
    snapshot: 'Energies snapshot',
    rows: [
      { symbol: 'USOil', ico: <SvgIco name="droplet" /> },
      { symbol: 'UKOil', ico: <SvgIco name="droplet" /> },
      { symbol: 'NGAS', ico: <SvgIco name="energies" /> },
    ],
  },
];

// % change only ever comes from a real previous close: pct === null means
// no previous close, so the slot shows an em dash - never a fabricated %.
function chgOf(s) {
  if (s.pct !== null && s.pct !== undefined && isFinite(s.pct)) {
    return {
      text: (s.pct >= 0 ? '+' : '') + s.pct.toFixed(2) + '%',
      cls: 'chg ' + (s.pct >= 0 ? 'up' : 'down'),
    };
  }
  return { text: '-', cls: 'chg na' };
}

export default function MarketsTabs() {
  const { prices } = usePrices();
  const [active, setActive] = useState('forex');

  return (
    <section className="section soft" id="markets">
      <div className="container">
        <h2 className="reveal">One account. Every market.</h2>
        <p className="sub reveal">
          Trade the markets you know, from one MT5 account. Pick a market to see what trades on
          it.
        </p>
        <div className="tabs reveal" role="tablist" aria-label="Markets">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={'tab-btn' + (active === t.id ? ' active' : '')}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              data-tab={t.id}
              onClick={() => setActive(t.id)}
            >
              <TabSvg name={t.id} />
              {t.label}
            </button>
          ))}
        </div>
        {TABS.map((t) => (
          <div
            key={t.id}
            className={'tab-panel reveal' + (active === t.id ? ' active' : '')}
            data-panel={t.id}
            role="tabpanel"
            hidden={active !== t.id}
          >
            <div className="tab-main">
              <h3>{t.label}</h3>
              <p>{t.text}</p>
              <div className="chip-row">
                {t.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
              <Link className="btn btn-gold btn-sm" style={{ marginTop: 20 }} to={t.linkTo}>
                {t.linkLabel}
              </Link>
            </div>
            <aside className="tab-side">
              <div className="tab-side-head">
                <span className="tab-side-ico">
                  <SideSvg name={t.id} />
                </span>
                <div>
                  <b>{t.snapshot}</b>
                  <span>Prices update every 15 seconds</span>
                </div>
              </div>
              {t.rows.map((r) => {
                const s = prices[r.symbol];
                const chg = chgOf(s);
                return (
                  <div
                    key={r.symbol}
                    className="mkt-price"
                    data-symbol={r.symbol}
                    data-live={s.live ? 'live' : 'sim'}
                  >
                    {r.ico}
                    <span className="mp-sym">{r.symbol}</span>
                    <b className="val">{formatPrice(s.p, s.d)}</b>
                    <span className={chg.cls}>{chg.text}</span>
                    <span className={s.live ? 'mp-tag live' : 'mp-tag'}>
                      {s.live ? 'LIVE' : 'SIM'}
                    </span>
                  </div>
                );
              })}
              <p className="tab-side-note">
                LIVE = live feed connected. SIM = simulated price until the feed connects.
              </p>
            </aside>
          </div>
        ))}
      </div>
    </section>
  );
}
