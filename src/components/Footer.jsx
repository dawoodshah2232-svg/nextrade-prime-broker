// Site footer (light theme): link columns, risk warning, then a distinct
// "Important" corporate block (company registration, England and Wales)
// above the copyright line - per the client brief, visible on every page.
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
      { to: '/promotions', icon: 'promotions', label: 'Promotions' },
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
            <img src={asset('logo-dark.png')} alt="NexTrade Prime" />
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              PAYOUT SPEED ABOVE ALL
            </div>
            <p>
              Trade forex, gold, indices and crypto on MetaTrader 5 - with fast payouts, leverage
              up to 1:1000 and support that answers.
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
          <b>Risk Warning:</b> Contracts for Difference (CFDs) are complex leveraged financial
          products and carry a high risk of losing money rapidly due to leverage. Trading may not be
          suitable for all investors. You should carefully consider your financial circumstances,
          investment objectives, level of experience and risk tolerance before trading. Do not trade
          with funds you cannot afford to lose. Bonuses and promotions are subject to their terms.
        </p>
        <div className="footer-important">
          <p>
            <b>Important:</b> NexTrade is operated by <b>NexTrade Ltd</b>, a company registered in{' '}
            <b>England and Wales</b> under company number <b>17435407</b>. Services are not offered
            in jurisdictions where such distribution or use would be contrary to applicable laws or
            regulations.
          </p>
          <p className="footer-corp">The corporate entity is incorporated in England and Wales.</p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 NexTrade Ltd. All rights reserved.</span>
          <span className="footer-legal">
            <Link to="/regulation">Regulation</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
