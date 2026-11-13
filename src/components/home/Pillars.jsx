// The three brand pillars from the client brief, directly under the price
// strip: Instant Withdrawal, Secure & Registered, Transparency.
// Wording rules (brief §2): no processing-time promise beyond what the
// Deposits & Withdrawals page already states, and no licence/regulator claim —
// only the verified fact that the company is registered in England and Wales.
import { Link } from 'react-router-dom';

const PILLARS = [
  {
    title: 'Instant Withdrawal',
    text: 'Payout speed is our first priority. Request a withdrawal from your client area and it goes straight into processing — back to the method you deposited with. Minimum withdrawal $100.',
    to: '/deposits-withdrawals',
    link: 'How withdrawals work',
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  },
  {
    title: 'Secure & Registered',
    text: 'NexTrade Ltd is a company registered in England and Wales (company number 17435407). Accounts are protected with identity verification and same-method withdrawals.',
    to: '/regulation',
    link: 'How we protect your funds',
    icon: (
      <>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Transparency',
    text: 'Account conditions, trading costs, deposit and withdrawal requirements and risk disclosures — published plainly, easy to find, with no hidden fees from us.',
    to: '/accounts',
    link: 'Compare accounts',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      </>
    ),
  },
];

export default function Pillars() {
  return (
    <section className="section pillars">
      <div className="container">
        <div className="center">
          <span className="eyebrow">Payout speed above all</span>
          <h2 style={{ marginTop: 10 }}>Built around getting you paid</h2>
          <p className="sub">
            Three promises that shape every part of NexTrade Prime — from the account you open to the
            moment you withdraw.
          </p>
        </div>
        <div className="grid3" style={{ marginTop: 36 }}>
          {PILLARS.map((p) => (
            <div key={p.title} className="card pillar-card">
              <div className="pillar-ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {p.icon}
                </svg>
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <Link className="pillar-link" to={p.to}>
                {p.link} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
