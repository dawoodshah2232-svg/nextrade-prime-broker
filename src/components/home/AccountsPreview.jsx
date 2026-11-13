// "Pick the account that fits you" - the five account types from the client
// brief (Standard, ECN, PRO, VIP, Islamic). No per-account minimum deposit
// or leverage tier: one shared note covers leverage (1:1000) and $100 minimum.
import { Link } from 'react-router-dom';
import { ACCOUNTS, ACCOUNT_NOTE } from '../../lib/accounts';

export default function AccountsPreview() {
  return (
    <section className="section soft">
      <div className="container">
        <h2>Pick the account that fits you</h2>
        <p className="sub">
          Five accounts, one platform. Switch or add an account any time from your client area.
        </p>
        <div className="acct-grid5" style={{ marginTop: 32 }}>
          {ACCOUNTS.map((a) => (
            <div
              key={a.id}
              className={'card acct-card acct-' + a.id + (a.featured ? ' acct-featured' : '')}
            >
              <span className={'tag' + (a.featured ? ' gold' : '')}>{a.tag}</span>
              <h3>{a.name}</h3>
              <p>{a.desc}</p>
              <p className="acct-key">
                <b>{a.spread}</b>
                <span>{a.commission}</span>
              </p>
              <Link className="btn btn-gold btn-sm" to="/accounts">
                Compare
              </Link>
            </div>
          ))}
        </div>
        <p className="acct-note">{ACCOUNT_NOTE}</p>
      </div>
    </section>
  );
}
