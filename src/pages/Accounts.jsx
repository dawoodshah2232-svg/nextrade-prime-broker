// Account Types page - the five account types from the client brief
// (Standard, ECN, PRO, VIP, Islamic) with a comparison table. Per the brief
// the table lists NO per-account minimum deposit or leverage tier; the shared
// conditions (1:1000 leverage, $100 minimum deposit and withdrawal) sit in
// one note above the table.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { ACCOUNTS, ACCOUNT_NOTE } from '../lib/accounts';

const ROWS = [
  { label: 'Spreads', get: (a) => <b>{a.spread}</b> },
  { label: 'Commission', get: (a) => a.commission },
  { label: 'Swaps', get: (a) => a.swap },
  { label: 'Minimum lot', get: () => '0.01' },
  { label: 'Stop-out level', get: () => '20%' },
  { label: 'Expert Advisors', get: () => 'Allowed' },
  { label: 'Hedging', get: () => 'Allowed' },
  { label: 'Negative balance protection', get: () => 'Yes' },
  { label: 'Platform', get: () => 'MetaTrader 5' },
];

export default function Accounts() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Trading' },
          { label: 'Account Types' },
        ]}
        title="Account types"
        intro="Five accounts, one platform. Every account trades on MT5 with leverage up to 1:1000, negative balance protection, hedging allowed and EAs welcome."
      />

      <section className="section">
        <div className="container">
          <div className="acct-grid5">
            {ACCOUNTS.map((a) => (
              <div
                key={a.id}
                className={'card acct-card acct-' + a.id + (a.featured ? ' acct-featured' : '')}
              >
                <span className={'tag' + (a.featured ? ' gold' : '')}>{a.tag}</span>
                <h3>{a.name}</h3>
                <p>{a.desc}</p>
                <ul className="check-list">
                  <li>
                    <span>Spreads: {a.spread}</span>
                  </li>
                  <li>
                    <span>{a.commission}</span>
                  </li>
                  <li>
                    <span>{a.swap}</span>
                  </li>
                </ul>
                <Link className="btn btn-gold btn-sm" to="/signup">
                  Open {a.name}
                </Link>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '64px' }}>Compare accounts</h2>
          <p className="acct-note" style={{ marginTop: 0, marginBottom: 18 }}>
            {ACCOUNT_NOTE}
          </p>
          <div className="table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Account type</th>
                  {ACCOUNTS.map((a) => (
                    <th key={a.id}>{a.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    {ACCOUNTS.map((a) => (
                      <td key={a.id}>{r.get(a)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '20px' }}>
            Not sure which fits? Start with a{' '}
            <Link to="/demo-account" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              demo account
            </Link>{' '}
            - it costs nothing, and you can open a live account of any type later. Need
            swap-free trading? See{' '}
            <Link to="/islamic-accounts" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Islamic accounts
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="cta-band">
            <h2>Open your account today</h2>
            <p>
              Registration takes about two minutes. Deposit from $100, get a 30% first-deposit
              bonus, and trade on MT5.
            </p>
            <Link className="btn btn-gold" to="/signup">
              Open an Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
