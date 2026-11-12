// Full conversion of islamic-accounts.html from ~/workspace/nextrade-old-html/.
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

export default function IslamicAccounts() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Trading' },
          { label: 'Islamic Accounts' },
        ]}
        title="Islamic accounts"
        intro="Swap-free trading with no overnight interest — available on Standard, Raw Spread and Pro accounts, at no extra cost."
      />

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="reveal">
              <h2>Trade without swaps</h2>
              <p className="lead" style={{ marginBottom: '18px' }}>
                An Islamic account works exactly like a standard account, except no swap
                (overnight interest) is charged or paid on positions held overnight.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  <span>
                    <b>No swap charges</b> — positions held overnight carry no interest, in
                    either direction.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Same spreads and leverage</b> — identical trading conditions to the
                    equivalent standard account.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>All instruments</b> — forex, gold, indices, crypto and energies, all
                    swap-free.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Free to enable</b> — request swap-free status from your client area or by
                    contacting support.
                  </span>
                </li>
              </ul>
              <Link className="btn btn-gold" style={{ marginTop: '20px' }} to="/signup">
                Open an Islamic Account
              </Link>
            </div>
            <div className="split-img reveal">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&auto=format&fit=crop"
                alt="Traders working at desks with laptops showing live market charts"
              />
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            Already have a live account? Ask support to convert it — see{' '}
            <Link to="/contact" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Contact Us
            </Link>{' '}
            or the{' '}
            <Link to="/help-centre" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Help Centre
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
