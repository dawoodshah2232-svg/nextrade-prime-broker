// Converted from promotions.html in ~/workspace/nextrade-old-html/ —
// verbatim copy, cards and terms; internal links are <Link> routes.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function Promotions() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Promotions' }]}
        title="Promotions"
        intro="Current offers for new and existing traders. Every promotion carries clear terms — read them before you opt in."
      />

      <section className="section">
        <div className="container">
          <div className="grid3">
            <div className="card reveal">
              <span className="tag gold">New traders</span>
              <h3>Welcome bonus — 50% on your first deposit</h3>
              <p>
                Deposit for the first time and get a 50% trading bonus, up to $500. The bonus
                is credited as margin and can be withdrawn once the volume requirement is met.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                Terms: minimum deposit $100 · volume requirement applies · one bonus per client
              </p>
              <Link className="btn btn-gold" style={{ marginTop: '14px' }} to="/signup">
                Claim Welcome Bonus
              </Link>
            </div>
            <div className="card reveal">
              <span className="tag">All traders</span>
              <h3>Refer a trader — $50 each</h3>
              <p>
                Invite a friend to open a live account and deposit. You both get $50 trading
                credit once they trade 1 standard lot.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                Terms: referred account must be verified · credit is non-withdrawable until
                traded
              </p>
              <Link className="btn btn-dark" style={{ marginTop: '14px' }} to="/dashboard">
                Get Your Referral Link
              </Link>
            </div>
            <div className="card reveal">
              <span className="tag">Active traders</span>
              <h3>Cashback on volume</h3>
              <p>
                Trade 10+ lots a month on Raw Spread and earn $2 cashback per lot, paid weekly
                into your account. No opt-in needed.
              </p>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.9rem' }}>
                Terms: Raw Spread accounts only · paid every Monday · see full terms in your
                client area
              </p>
              <Link className="btn btn-dark" style={{ marginTop: '14px' }} to="/accounts">
                See Raw Spread
              </Link>
            </div>
          </div>
          <p style={{ marginTop: '28px', color: 'var(--muted)' }}>
            Bonuses are trading credit, not cash, and carry volume requirements. Never deposit
            more than you can afford to lose in order to chase a bonus. Full terms for each
            promotion are available in your client area and from{' '}
            <Link to="/contact" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              support
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
