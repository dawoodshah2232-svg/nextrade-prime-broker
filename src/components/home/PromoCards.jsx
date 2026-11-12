// Four promo cards overlapping the hero base — verbatim port of the old
// index.html promo section. The icons are inlined verbatim (stroke
// #e8c766 inside .promo-ico) — MIcon would be wrong here: it renders a
// .m-ico wrapper with a #c9a227 stroke, which is the header's styling,
// not the promo cards'.
import { Link } from 'react-router-dom';

const CARDS = [
  {
    to: '/accounts',
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
        <path d="M7 3v4M7 17v4M17 3v4M17 17v4" />
        <rect x="5" y="7" width="4" height="10" rx="1" />
        <rect x="15" y="7" width="4" height="10" rx="1" />
      </svg>
    ),
    title: 'Raw Spread from 0.0 pips',
    text: 'The tightest pricing we offer, with a small commission per lot.',
    link: 'See accounts →',
  },
  {
    to: '/markets/metals',
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
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
      </svg>
    ),
    title: 'Gold — XAU/USD',
    text: 'Trade gold against the dollar, from 0.01 lots, around the clock.',
    link: 'Trade gold →',
  },
  {
    to: '/platforms/mt5',
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
        <rect x="2.5" y="4" width="19" height="12" rx="2" />
        <path d="M8 20h8M12 16v4M7 12l2.5-3 2 2 3-4" />
      </svg>
    ),
    title: 'MetaTrader 5',
    text: 'The platform professionals already know — desktop, web and mobile.',
    link: 'Explore MT5 →',
  },
  {
    to: '/demo-account',
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
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5l5 3.5-5 3.5z" />
      </svg>
    ),
    title: 'Free demo account',
    text: '$10,000 virtual funds, live prices, full MT5 — no time limit.',
    link: 'Open a demo →',
  },
];

export default function PromoCards() {
  return (
    <section className="promo-section">
      <div className="container">
        <div className="promo-grid">
          {CARDS.map((c) => (
            <Link key={c.to} className="promo-card reveal" to={c.to}>
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
