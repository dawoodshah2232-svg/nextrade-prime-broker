// Converted from platforms.html in ~/workspace/nextrade-old-html/ —
// verbatim copy, sections and classes; internal links are <Link> routes.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

// Green check mark from the old site's check-list items (verbatim SVG).
function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function Platforms() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Trading' },
          { label: 'Platforms' },
        ]}
        title="Trading platforms"
        intro="One platform, every device. Every NexTrade Prime account runs on MetaTrader 5."
      />

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="split-img reveal">
              <img
                src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80&auto=format&fit=crop"
                alt="MetaTrader 5 terminal on a laptop and phone with live charts"
              />
            </div>
            <div className="reveal">
              <h2>MetaTrader 5</h2>
              <p className="lead" style={{ marginBottom: '16px' }}>
                The platform professional traders already know — advanced charting, 80+ indicators,
                depth of market and automated trading, on desktop, web and mobile.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  <span>
                    <b>Desktop</b> — the full MT5 terminal for Windows and Mac.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Web terminal</b> — trade from any browser, nothing to install.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Mobile</b> — iOS and Android apps with the same account and charts.
                  </span>
                </li>
              </ul>
              <Link className="btn btn-gold" style={{ marginTop: '20px' }} to="/platforms/mt5">
                Explore MT5
              </Link>
            </div>
          </div>
          <div className="grid3" style={{ marginTop: '56px' }}>
            <div className="card reveal">
              <h3>MT5 Desktop</h3>
              <p>Full charting, EAs, depth of market and one-click trading. Windows and Mac.</p>
              <Link to="/platforms/mt5" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Learn more →
              </Link>
            </div>
            <div className="card reveal">
              <h3>MT5 Web</h3>
              <p>Trade from any browser with no download. Same account, same positions.</p>
              <Link to="/platforms/mt5" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Learn more →
              </Link>
            </div>
            <div className="card reveal">
              <h3>MT5 Mobile</h3>
              <p>iOS and Android. Watch the market and manage trades from anywhere.</p>
              <Link to="/platforms/mt5" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
