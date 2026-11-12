// "One platform. Every market." — MT5 split section, verbatim port of
// the old index.html section. Terminal screenshot via asset(); the MT5
// logo URL is copied verbatim from metatrader5.com.
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';

const CHECKS = [
  {
    bold: '80+ indicators',
    rest: ' — charting, drawing tools and depth of market built in.',
  },
  {
    bold: 'Expert Advisors',
    rest: ' — run automated strategies around the clock.',
  },
  {
    bold: 'One-click trading',
    rest: ' — enter and exit in a single click.',
  },
];

export default function MT5Section() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid2">
          <div className="split-img reveal mt5-shot">
            <img
              src={asset('mt5-terminal.png')}
              alt="MetaTrader 5 desktop terminal — Market Watch, Navigator and XAU/USD charts with indicators"
              loading="lazy"
            />
          </div>
          <div className="reveal">
            <div className="mt5-logo-chip">
              <img
                src="https://www.metatrader5.com/i/metatrader-5-logo.png"
                alt="MetaTrader 5"
                loading="lazy"
              />
            </div>
            <h2>One platform. Every market.</h2>
            <p className="lead" style={{ marginBottom: 18 }}>
              Every NexTrade Prime account trades on MetaTrader 5 — the platform professional
              traders already know. Desktop, web and mobile, with the same account everywhere.
            </p>
            <ul className="check-list">
              {CHECKS.map((c) => (
                <li key={c.bold}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  <span>
                    <b>{c.bold}</b>
                    {c.rest}
                  </span>
                </li>
              ))}
            </ul>
            <Link className="btn btn-gold" style={{ marginTop: 20 }} to="/platforms/mt5">
              Explore MT5
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
