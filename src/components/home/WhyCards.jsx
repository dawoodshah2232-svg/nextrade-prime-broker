// "Why traders choose NexTrade Prime" - three photo-top cards, verbatim
// port of the old index.html section. Photo URLs and icon SVGs (including
// the 80x80 gold-disc icons) are copied verbatim from the old markup.
import { Link } from 'react-router-dom';

export default function WhyCards() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">Why traders choose NexTrade Prime</h2>
        <p className="sub reveal">Three things, done properly. No clutter, no small print surprises.</p>
        <div className="grid3" style={{ marginTop: 32 }}>
          <div className="card reveal fund-card why-card">
            <div className="fund-photo">
              <img
                src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=1200&q=80"
                alt="Classical bank building - client funds held in segregated accounts"
                loading="lazy"
              />
            </div>
            <div className="icon3d">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Segregated funds</h3>
            <p>
              Client funds are held in segregated accounts, separate from company operating funds.
            </p>
            <Link className="card-link" to="/regulation">
              How we protect your funds →
            </Link>
          </div>
          <div className="card reveal fund-card why-card">
            <div className="fund-photo">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80"
                alt="Candlestick chart close-up - tight spreads on every account"
                loading="lazy"
              />
            </div>
            <div className="icon3d">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="37" fill="#fdf3d0" />
                <path
                  d="M20 52l12-14 10 8 18-22"
                  stroke="#c9a227"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M52 24h8v8" stroke="#c9a227" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Tight spreads</h3>
            <p>
              Spreads from 0.0 pips on ECN accounts and from 1.0 pip on Standard - published
              on every account page, not hidden in a footnote.
            </p>
            <Link className="card-link" to="/accounts">
              See the spreads →
            </Link>
          </div>
          <div className="card reveal fund-card why-card">
            <div className="fund-photo">
              <img
                src="https://images.unsplash.com/photo-1716279083176-60af7a63cb03?auto=format&fit=crop&w=1200&q=80"
                alt="Trader at a desk with a candlestick chart and order book - orders executed in milliseconds"
                loading="lazy"
              />
            </div>
            <div className="icon3d">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="37" fill="#fdf3d0" />
                <path
                  d="M40 18v22l14 10"
                  stroke="#c9a227"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="40" cy="40" r="24" stroke="#c9a227" strokeWidth="3" />
              </svg>
            </div>
            <h3>Fast execution</h3>
            <p>
              Market execution in milliseconds on MT5, with no requotes on market orders. Your
              order goes in when you click, not after.
            </p>
            <Link className="card-link" to="/platforms/mt5">
              Explore MT5 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
