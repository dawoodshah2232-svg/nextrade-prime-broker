// Full conversion of demo-account.html from ~/workspace/nextrade-old-html/.
// The green check SVGs are copied verbatim from the old page (they are
// not part of the gold icon set in ../components/icons.jsx).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function DemoAccount() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Trading' },
          { label: 'Demo Account' },
        ]}
        title="Demo account"
        intro="Practice with $10,000 of virtual funds on the real MT5 platform, with live market prices. No deposit, no risk, no expiry pressure."
      />

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="reveal">
              <h2>Learn the platform before you risk a dollar</h2>
              <p className="lead" style={{ marginBottom: '18px' }}>
                A demo account works exactly like a live one - same charts, same order types,
                same spreads - except the money is virtual.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  <span>
                    <b>$10,000 virtual balance</b> - reset any time from your client area.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>All 1,000+ instruments</b> - forex, gold, indices, crypto and energies.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Full MT5</b> - indicators, EAs and one-click trading, just like live.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>No time limit</b> - keep it for as long as you need it.
                  </span>
                </li>
              </ul>
              <Link className="btn btn-gold" style={{ marginTop: '20px' }} to="/signup">
                Open a Demo Account
              </Link>
            </div>
            <div className="split-img reveal">
              <img
                src="https://images.unsplash.com/photo-1579225663317-c0251b4369bc?w=1200&q=80&auto=format&fit=crop"
                alt="Young trader at a desk using a laptop with candlestick charts"
              />
            </div>
          </div>
          <div className="grid3" style={{ marginTop: '56px' }}>
            <div className="card reveal">
              <h3>1. Register</h3>
              <p>Enter your name and email. Your demo login arrives in under a minute.</p>
            </div>
            <div className="card reveal">
              <h3>2. Download MT5</h3>
              <p>Install MT5 on desktop or mobile, or trade straight from the web terminal.</p>
            </div>
            <div className="card reveal">
              <h3>3. Place your first trade</h3>
              <p>
                Try a 0.01 lot on EUR/USD or gold. Watch how spreads, margin and P&amp;L move.
              </p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            Ready for real money?{' '}
            <Link to="/accounts" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Compare live accounts →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
