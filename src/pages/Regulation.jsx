// Converted from regulation.html (~/workspace/nextrade-old-html/) - copy,
// sections and classes verbatim. ONE client-supplied addition (via Kailash,
// 12 Nov): the line "The corporate entity is incorporated in England and
// Wales." directly under the hero, i.e. under the existing honest note that
// no regulator name or licence number is published on this demo site. That
// note is kept exactly as it is - no regulator name, licence number, company
// name or registration number is invented anywhere.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function Regulation() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company' },
          { label: 'Regulation' },
        ]}
        title="Regulation & fund protection"
        intro="How your money is handled, in plain language. No regulator name or licence number is published on this demo site - those details will be added here when NexTrade Prime provides them."
      />

      <section className="section">
        <div className="container">
          <p className="reveal" style={{ maxWidth: 760, marginBottom: 32 }}>
            The corporate entity is incorporated in England and Wales.
          </p>
          <div className="grid3">
            <div className="card reveal">
              <h3>Segregated client accounts</h3>
              <p>
                Client funds are held in accounts segregated from company operating funds. Your
                deposit is never used to pay company expenses.
              </p>
            </div>
            <div className="card reveal">
              <h3>Negative balance protection</h3>
              <p>
                Your account balance can never go below zero. A fast market cannot leave you owing
                us money.
              </p>
            </div>
            <div className="card reveal">
              <h3>Transparent pricing</h3>
              <p>
                Spreads, commissions and swap rates are published on the{' '}
                <Link to="/accounts" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                  Account Types
                </Link>{' '}
                page and in MT5. What you see is what is charged.
              </p>
            </div>
          </div>
          <h2 style={{ marginTop: 56 }}>Before you trade, know this</h2>
          <p className="reveal" style={{ maxWidth: 760 }}>
            CFDs are leveraged products. Leverage magnifies both profits and losses, and most
            retail traders lose money trading CFDs. Read the risk warning on every page of this
            site, start on a{' '}
            <Link to="/demo-account" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              demo account
            </Link>
            , and never trade with money you cannot afford to lose.
          </p>
          <p style={{ marginTop: 20 }}>
            Questions about how funds are handled?{' '}
            <Link to="/contact" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Contact us →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
