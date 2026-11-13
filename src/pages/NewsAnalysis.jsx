// Converted from news-analysis.html in ~/workspace/nextrade-old-html/ —
// verbatim copy, cards and dates; internal links are <Link> routes.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function NewsAnalysis() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Discover' },
          { label: 'News & Analysis' },
        ]}
        title="News & analysis"
        intro="What moved, why it moved, and what to watch next — plain language, every trading day."
      />

      <section className="section">
        <div className="container">
          <div className="grid3">
            <div className="card reveal">
              <span className="tag gold">Gold</span>
              <h3>Gold holds above $4,200 as rate-cut bets build</h3>
              <p>
                XAU/USD stays supported after softer US inflation data. The next test is the
                $4,300 area — watch the dollar for direction.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                11 November 2026 · Market analysis
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Forex</span>
              <h3>EUR/USD: range-bound into the ECB</h3>
              <p>
                Euro-dollar has spent two weeks between 1.1550 and 1.1700. A break either way
                likely needs a surprise from Frankfurt.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                11 November 2026 · Market analysis
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Indices</span>
              <h3>US500: earnings carry the rally</h3>
              <p>
                Strong tech earnings keep the S&P near highs, but breadth is thinning. Watch
                Friday's payrolls for the next catalyst.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                10 November 2026 · Market analysis
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Crypto</span>
              <h3>Bitcoin steadies near $97,000</h3>
              <p>
                BTC is consolidating after a volatile month. Volatility is compressing — the
                next directional move usually follows.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                10 November 2026 · Market analysis
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Education</span>
              <h3>How to read NFP without blowing up</h3>
              <p>
                Payrolls move everything in seconds. A practical guide: what the number means,
                and how to size for it.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                9 November 2026 · Guide
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Education</span>
              <h3>Leverage: 1:1000 explained properly</h3>
              <p>
                Leverage is a tool, not a target. How margin really works, and why smaller is
                usually smarter.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                8 November 2026 · Guide
              </p>
            </div>
          </div>
          <p style={{ marginTop: '32px' }}>
            Trade what you read about:{' '}
            <Link to="/signup" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              open an account
            </Link>{' '}
            or practice on a{' '}
            <Link to="/demo-account" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              demo
            </Link>
            . Check the{' '}
            <Link to="/economic-calendar" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              economic calendar
            </Link>{' '}
            before trading any event in these notes.
          </p>
        </div>
      </section>
    </>
  );
}
