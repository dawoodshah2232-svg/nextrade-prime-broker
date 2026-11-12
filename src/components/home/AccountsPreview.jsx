// "Pick the account that fits you" — three account cards, verbatim port
// of the old index.html section. Standard $10 / Raw $100 / Pro $500,
// same copy and same "Compare Accounts" links.
import { Link } from 'react-router-dom';

export default function AccountsPreview() {
  return (
    <section className="section soft">
      <div className="container">
        <h2 className="reveal">Pick the account that fits you</h2>
        <p className="sub reveal">
          Three accounts, one platform. Switch or add an account any time from your client area.
        </p>
        <div className="grid3" style={{ marginTop: 32 }}>
          <div className="card reveal acct-card acct-standard">
            <span className="tag">Most popular</span>
            <h3>Standard</h3>
            <p>Simple pricing, no commission. The right start for most traders.</p>
            <p style={{ marginTop: 12 }}>
              <b style={{ color: 'var(--ink)', fontSize: '1.6rem' }}>$10</b> minimum deposit
            </p>
            <p>Spreads from 1.0 pip · No commission · Leverage up to 1:500</p>
            <Link className="btn btn-gold" style={{ marginTop: 16 }} to="/accounts">
              Compare Accounts
            </Link>
          </div>
          <div className="card reveal acct-card acct-raw">
            <span className="tag gold">Tightest spreads</span>
            <h3>Raw Spread</h3>
            <p>
              Spreads from 0.0 pips with a small commission per lot. Built for active traders and
              scalpers.
            </p>
            <p style={{ marginTop: 12 }}>
              <b style={{ color: 'var(--ink)', fontSize: '1.6rem' }}>$100</b> minimum deposit
            </p>
            <p>Spreads from 0.0 pips · $3.50 per side, per lot · Leverage up to 1:500</p>
            <Link className="btn btn-gold" style={{ marginTop: 16 }} to="/accounts">
              Compare Accounts
            </Link>
          </div>
          <div className="card reveal acct-card acct-pro">
            <span className="tag">For professionals</span>
            <h3>Pro</h3>
            <p>Near-raw spreads with no commission, for larger balances and higher volume.</p>
            <p style={{ marginTop: 12 }}>
              <b style={{ color: 'var(--ink)', fontSize: '1.6rem' }}>$500</b> minimum deposit
            </p>
            <p>Spreads from 0.1 pips · No commission · Leverage up to 1:500</p>
            <Link className="btn btn-gold" style={{ marginTop: 16 }} to="/accounts">
              Compare Accounts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
