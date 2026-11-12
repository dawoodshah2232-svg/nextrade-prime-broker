// Site footer — markup ported exactly from the old index.html
// (<footer class="site-footer">), links converted to <Link> and pointed at
// the canonical routes. ONE addition (client motto, supplied via Kailash):
// "PAYOUT SPEED ABOVE ALL" under the logo, in the existing .eyebrow style
// (small gold caps) — no new design language.
import { Link } from 'react-router-dom';
import { asset } from '../lib/asset';
import { FIcon } from './icons';

const COLUMNS = [
  {
    title: 'Trading',
    links: [
      { to: '/accounts', icon: 'accounts', label: 'Account Types' },
      { to: '/demo-account', icon: 'demo', label: 'Demo Account' },
      { to: '/islamic-accounts', icon: 'islamic', label: 'Islamic Accounts' },
      { to: '/deposits-withdrawals', icon: 'deposits', label: 'Deposits & Withdrawals' },
    ],
  },
  {
    title: 'Markets',
    links: [
      { to: '/markets/forex', icon: 'forex', label: 'Forex' },
      { to: '/markets/metals', icon: 'metals', label: 'Metals' },
      { to: '/markets/indices', icon: 'indices', label: 'Indices' },
      { to: '/markets/crypto', icon: 'crypto', label: 'Crypto' },
      { to: '/markets/energies', icon: 'energies', label: 'Energies' },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { to: '/platforms/mt5', icon: 'mt5', label: 'MT5 Platform' },
      { to: '/platforms', icon: 'platforms', label: 'All Platforms' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', icon: 'about', label: 'About' },
      { to: '/regulation', icon: 'regulation', label: 'Regulation' },
      { to: '/contact', icon: 'contact', label: 'Contact Us' },
      { to: '/faq', icon: 'faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/help-centre', icon: 'help', label: 'Help Centre' },
      { to: '/economic-calendar', icon: 'calendar', label: 'Economic Calendar' },
      { to: '/calculators', icon: 'calculators', label: 'Calculators' },
      { to: '/news-analysis', icon: 'blog', label: 'News and Analysis' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={asset('logo-light.png')} alt="NexTrade Prime" />
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              PAYOUT SPEED ABOVE ALL
            </div>
            <p>
              Trade forex, gold, indices and crypto on MetaTrader 5 — with tight spreads, fast
              execution and support that answers.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <Link key={l.to} to={l.to}>
                  <FIcon name={l.icon} />
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <p className="risk">
          Risk warning: CFDs are leveraged products and carry a high level of risk to your capital.
          Prices can move against you, and you may lose more than your initial deposit if negative
          balance protection does not apply in your jurisdiction. You should not trade with money
          you cannot afford to lose. Past performance is not a reliable indicator of future results.
          This website is a demonstration front-end; account opening, deposits and trading are
          simulated in this demo.
        </p>
        <div className="footer-bottom">
          <span>© 2026 NexTrade Prime. All rights reserved.</span>
          <span className="footer-legal">
            <Link to="/regulation">Regulation</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
