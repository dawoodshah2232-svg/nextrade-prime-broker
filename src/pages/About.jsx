// Converted from about.html (~/workspace/nextrade-old-html/) — copy, sections
// and classes verbatim. TWO client-supplied additions (via Kailash, 12 Nov):
// (a) the company motto "PAYOUT SPEED ABOVE ALL" as a gold motto line in
// the intro section (same .eyebrow style the footer uses for the motto);
// (b) a "Corporate Presence" section with one card — United Kingdom /
// "Corporate entity incorporated in England and Wales." — using only the
// text the client shared. No company name, registration number, address or
// licence is invented anywhere. The stats are plain text in the old page
// (no data-count), so no CountUp here. The split image is an external
// Unsplash URL, copied verbatim.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company' },
          { label: 'About' },
        ]}
        title="About NexTrade Prime"
        intro="A broker built by traders, for traders — with pricing you can read, execution you can feel, and support that answers."
      />

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="reveal">
              <h2>What we stand for</h2>
              <p className="lead" style={{ marginBottom: 16 }}>
                Most brokers compete on noise. We compete on the three things that actually decide
                whether a trader stays: spreads, execution and withdrawals.
              </p>
              <p className="eyebrow" style={{ marginBottom: 16, fontSize: '1rem' }}>
                PAYOUT SPEED ABOVE ALL
              </p>
              <ul className="check-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  <span>
                    <b>Published spreads</b> — the spread on the account page is the spread you
                    get. No asterisks.
                  </span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  <span>
                    <b>Execution in milliseconds</b> — market orders filled at market, with no
                    requotes.
                  </span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  <span>
                    <b>Withdrawals the same day</b> — your money is yours, and it moves when you
                    ask it to.
                  </span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  <span>
                    <b>Education, not hype</b> — free courses and live sessions that teach risk
                    first.
                  </span>
                </li>
              </ul>
            </div>
            <div className="split-img reveal">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&auto=format&fit=crop"
                alt="Traders working at desks with laptops showing live market charts"
              />
            </div>
          </div>
          <div className="stats-grid" style={{ marginTop: 64 }}>
            <div
              className="stat reveal"
              style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: 28 }}
            >
              <b style={{ color: 'var(--ink)' }}>1,000+</b>
              <span style={{ color: 'var(--muted)' }}>Instruments</span>
            </div>
            <div
              className="stat reveal"
              style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: 28 }}
            >
              <b style={{ color: 'var(--ink)' }}>0.0</b>
              <span style={{ color: 'var(--muted)' }}>Spreads from (pips)</span>
            </div>
            <div
              className="stat reveal"
              style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: 28 }}
            >
              <b style={{ color: 'var(--ink)' }}>1:500</b>
              <span style={{ color: 'var(--muted)' }}>Max leverage</span>
            </div>
            <div
              className="stat reveal"
              style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: 28 }}
            >
              <b style={{ color: 'var(--ink)' }}>24/7</b>
              <span style={{ color: 'var(--muted)' }}>Support</span>
            </div>
          </div>
          <h2 style={{ marginTop: 64 }}>Corporate Presence</h2>
          <div className="grid3" style={{ marginTop: 24 }}>
            <div className="card reveal">
              <div className="icon3d">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 9.5L12 4l9 5.5" />
                  <path d="M3 9.5h18" />
                  <path d="M5.5 11.5v5.5M9.8 11.5v5.5M14.2 11.5v5.5M18.5 11.5v5.5" />
                  <path d="M3.5 17.5h17M2.5 20.5h19" />
                </svg>
              </div>
              <h3>United Kingdom</h3>
              <p>Corporate entity incorporated in England and Wales.</p>
            </div>
          </div>
          <p style={{ marginTop: 40 }}>
            Questions?{' '}
            <Link to="/contact" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Talk to us →
            </Link>{' '}
            &nbsp;·&nbsp; Ready to start?{' '}
            <Link to="/signup" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Open an account →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
