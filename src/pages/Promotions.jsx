// Promotions - the client's current offers (brief §3, matching the
// yournextrade.com key points): 30% first-deposit bonus, 10% re-deposit
// bonus, swap-free first week, plus leverage up to 1:1000. Caps, expiry and
// trading requirements are NOT invented here: the cards point to the full
// promotion terms, which the company must confirm before publishing figures.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const PROMOS = [
  {
    big: '30%',
    tag: 'First deposit',
    title: 'First-deposit bonus',
    text: 'Boost your trading power with a 30% bonus on your first deposit into a live account.',
    terms: 'Minimum deposit $100 · one first-deposit bonus per client · eligibility, caps, expiry and trading requirements apply',
    cta: 'Claim 30% Bonus',
    to: '/signup',
    gold: true,
  },
  {
    big: '10%',
    tag: 'Every re-deposit',
    title: 'Re-deposit bonus',
    text: 'Earn a 10% bonus on every subsequent deposit you make into your live account.',
    terms: 'Applies to deposits after your first · eligibility, caps, expiry and trading requirements apply',
    cta: 'Open an Account',
    to: '/signup',
  },
  {
    big: '0',
    tag: 'First week',
    title: 'Swap-free first week',
    text: 'No overnight swap charges for your first week of live trading, on every account type.',
    terms: 'New live accounts · first week of trading · eligibility and timing set out in the promotion terms',
    cta: 'See Account Types',
    to: '/accounts',
  },
  {
    big: '1:1000',
    tag: 'All accounts',
    title: 'Leverage up to 1:1000',
    text: 'Maximise your potential with flexible leverage on Standard, ECN, PRO, VIP and Islamic accounts.',
    terms: 'Subject to account, instrument and trading conditions · leverage magnifies losses as well as gains',
    cta: 'Compare Accounts',
    to: '/accounts',
  },
];

export default function Promotions() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Promotions' }]}
        title="Promotions"
        intro="Current offers for new and existing traders. Every promotion carries clear terms - read them before you opt in."
      />

      <section className="section">
        <div className="container">
          <div className="grid2 promo-page-grid">
            {PROMOS.map((p) => (
              <div key={p.title} className="card promo-offer">
                <div className="promo-offer-head">
                  <span className="promo-big">{p.big}</span>
                  <span className={'tag' + (p.gold ? ' gold' : '')}>{p.tag}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <p className="promo-terms">Terms: {p.terms}</p>
                <Link className={'btn ' + (p.gold ? 'btn-gold' : 'btn-dark')} to={p.to}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '28px', color: 'var(--muted)' }}>
            Bonuses are trading credit, not cash, and carry trading requirements before they can be
            withdrawn. Never deposit more than you can afford to lose in order to chase a bonus.
            Full terms for each promotion are available in your client area and from{' '}
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
