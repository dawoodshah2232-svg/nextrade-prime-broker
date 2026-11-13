// Four promo cards overlapping the hero base — the client's headline offers
// (fast withdrawals, 30% first-deposit bonus, 10% re-deposit bonus,
// swap-free first week). The icons are inlined verbatim (stroke
// #e8c766 inside .promo-ico) — MIcon would be wrong here: it renders a
// .m-ico wrapper with a #c9a227 stroke, which is the header's styling,
// not the promo cards'.
import { Link } from 'react-router-dom';

const CARDS = [
  {
    to: '/deposits-withdrawals',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e8c766"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
      </svg>
    ),
    title: 'Fast withdrawals',
    text: 'Payout speed above all — a simple, secure withdrawal process. Minimum withdrawal $100.',
    link: 'How it works →',
  },
  {
    to: '/promotions',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e8c766"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8v13M3 12h18M12 8c-1.5-3-5-3.5-5-1s3 1 5 1c2 0 5 1.5 5-1s-3.5-2-5 1z" />
      </svg>
    ),
    title: '30% first-deposit bonus',
    text: 'Boost your trading power with a 30% bonus on your first deposit.',
    link: 'See terms →',
  },
  {
    to: '/promotions',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e8c766"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
        <path d="M21 3v5h-5M12 8v8M8 12h8" />
      </svg>
    ),
    title: '10% re-deposit bonus',
    text: 'Earn a 10% bonus on every subsequent deposit you make.',
    link: 'See terms →',
  },
  {
    to: '/promotions',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e8c766"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" />
      </svg>
    ),
    title: 'Swap-free first week',
    text: 'No overnight swaps for your first week of live trading.',
    link: 'Learn more →',
  },
];

export default function PromoCards() {
  return (
    <section className="promo-section">
      <div className="container">
        <div className="promo-grid">
          {CARDS.map((c) => (
            <Link key={c.title} className="promo-card reveal" to={c.to}>
              <div className="promo-ico">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="promo-link">{c.link}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
