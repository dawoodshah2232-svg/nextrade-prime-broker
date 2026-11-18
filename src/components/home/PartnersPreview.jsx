// Homepage teaser for the Partners & IBs programme (/partners), placed
// above "Spreads that stay honest". Same facts and the same worked example
// as the Partners page: volume rebate on every lot + a share of the ECN
// commission ($3.50/side = $7 round turn). Rates are examples only - real
// rates are set per partner in the IB agreement, and the card says so.
import { Link } from 'react-router-dom';

const svg = (d) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const ICONS = {
  rebate: svg(
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7" />
      <path d="M20 4v4.7h-4.7" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.3" />
      <path d="M4 20v-4.7h4.7" />
      <path d="M12 8.5v7M14 10h-2.8a1.2 1.2 0 0 0 0 2.4h1.6a1.2 1.2 0 0 1 0 2.4H10" />
    </>,
  ),
  commission: svg(
    <>
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 9 9h-9z" />
      <circle cx="12" cy="12" r="9" />
    </>,
  ),
  network: svg(
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2v4.3M12 11.5l-5.6 4.7M12 11.5l5.6 4.7" />
    </>,
  ),
};

const POINTS = [
  'Volume rebate on every lot, on all five account types',
  'Plus a share of the commission on ECN accounts',
  'Real-time IB dashboard, tracking links and sub-IBs',
  'IB payouts on the same fast rails as client withdrawals',
];

export default function PartnersPreview() {
  return (
    <section className="section navy pp-section">
      <div className="pp-glow" aria-hidden="true" />
      <div className="container pp-grid">
        <div className="pp-copy">
          <span className="eyebrow" data-aos="fade-up">
            Partners &amp; IBs
          </span>
          <h2 data-aos="fade-up" data-aos-delay="60">
            Refer traders. <span className="pp-gold">Earn twice</span> on every lot.
          </h2>
          <p className="pp-lead" data-aos="fade-up" data-aos-delay="120">
            Our Introducing Broker programme pays a volume rebate on every lot your clients trade,
            plus a share of the commission on ECN accounts - with transparent tracking and payouts
            as fast as our client withdrawals.
          </p>
          <ul className="pp-points">
            {POINTS.map((p, i) => (
              <li key={p} data-aos="fade-up" data-aos-delay={160 + i * 60}>
                {p}
              </li>
            ))}
          </ul>
          <div className="pp-cta" data-aos="fade-up" data-aos-delay="400">
            <Link className="btn btn-gold" to="/partners">
              Explore the Programme
            </Link>
            <Link className="btn btn-outline-light" to="/partners#ib-calculator">
              Estimate Earnings
            </Link>
          </div>
        </div>

        <div className="pp-card" data-aos="fade-left" data-aos-delay="150">
          <div className="pp-card-head">
            <span>One ECN trade · 2 lots EUR/USD</span>
            <em>Example</em>
          </div>

          <div className="pp-row">
            <span className="pp-ico">{ICONS.rebate}</span>
            <div className="pp-row-txt">
              <b>Volume rebate</b>
              <small>2 lots × $5 per lot</small>
              <span className="pp-bar">
                <i style={{ '--w': '70%' }} />
              </span>
            </div>
            <strong>$10.00</strong>
          </div>
          <div className="pp-row">
            <span className="pp-ico">{ICONS.commission}</span>
            <div className="pp-row-txt">
              <b>Commission share</b>
              <small>2 lots × $7 × 30%</small>
              <span className="pp-bar">
                <i style={{ '--w': '30%' }} />
              </span>
            </div>
            <strong>$4.20</strong>
          </div>

          <div className="pp-total">
            <span>You earn on this one trade</span>
            <strong>$14.20</strong>
          </div>

          <div className="pp-facts">
            <div>
              <b>2</b>
              <span>income streams</span>
            </div>
            <div>
              <b>24h</b>
              <span>max. wire payout</span>
            </div>
            <div>
              <span className="pp-mini-ico">{ICONS.network}</span>
              <span>sub-IB override</span>
            </div>
          </div>
          <p className="pp-note">
            Example rates. Your rebate and commission share are set in your IB agreement.
          </p>
        </div>
      </div>
    </section>
  );
}
