// Converted from platforms/mt5.html in ~/workspace/nextrade-old-html/ —
// the folder copy is canonical. The flat platforms-mt5.html is the same
// page; the only differences are the ../ path prefixes on its links and
// asset URLs (verified by diff — body copy is identical).
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

export default function PlatformsMt5() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Platforms', to: '/platforms' },
          { label: 'MT5' },
        ]}
        title="MetaTrader 5"
        intro="The platform professional traders already know. Advanced charting, automated trading and one-click execution — on every device."
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
              <div
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                }}
              >
                <img
                  src="https://www.metatrader5.com/i/metatrader-5-logo.png"
                  alt="MetaTrader 5 — official logo"
                  style={{ height: '36px', width: 'auto' }}
                />
                <b style={{ color: 'var(--ink)' }}>MetaTrader 5</b>
                <span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>by MetaQuotes</span>
              </div>
              <h2>Trade where the pros trade</h2>
              <p className="lead" style={{ marginBottom: '16px' }}>
                MT5 is the most-used trading platform in the world for a reason: it does
                everything, and it does it fast.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  <span>
                    <b>80+ indicators and 21 timeframes</b> — chart any market, any way you like.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Expert Advisors (EAs)</b> — automate your strategy and trade around the
                    clock.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Depth of market</b> — see the order book and trade with full transparency.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>One-click trading</b> — enter and exit in a single click.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <h2 style={{ marginTop: '64px' }}>Pick your device</h2>
          <div className="grid3" style={{ marginTop: '24px' }}>
            <div className="card reveal">
              <h3>MT5 Desktop</h3>
              <p>
                The full terminal for Windows and Mac. Every indicator, every EA, every order
                type — with the fastest execution.
              </p>
            </div>
            <div className="card reveal">
              <h3>MT5 Web</h3>
              <p>
                Trade from any browser with nothing to install. Log in with your account and
                trade from any computer.
              </p>
            </div>
            <div className="card reveal">
              <h3>MT5 Mobile</h3>
              <p>
                iOS and Android apps. Full charts, alerts and order management from your phone,
                synced with desktop.
              </p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            <Link className="btn btn-gold" to="/signup">
              Open an MT5 Account
            </Link>
            &nbsp;&nbsp;
            <Link className="btn btn-ghost" to="/demo-account">
              Try MT5 on Demo
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
