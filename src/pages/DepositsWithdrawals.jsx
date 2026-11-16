// Deposits & Withdrawals - layout per the client's design (16 Nov): hero
// with a gold "&", then "Deposit Methods" and "Withdrawal Methods" as
// navy-headed tables with a method icon, processing time, minimum and fee.
// Values are exactly the client's; the explanatory copy below the tables
// is kept consistent with them.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const ICONS = {
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19M6 15h3" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9.5L12 4l9 5.5" />
      <path d="M4.5 10v8M8.5 10v8M12 10v8M15.5 10v8M19.5 10v8" />
      <path d="M3 20.5h18" />
    </>
  ),
  wallet: (
    <>
      <path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4H5a2.5 2.5 0 0 0 0 5h14a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5H5A2.5 2.5 0 0 1 2.5 17.5v-11" />
      <path d="M16.5 14.5h.01" />
    </>
  ),
  crypto: (
    <>
      <circle cx="9.5" cy="12" r="6.5" />
      <path d="M15 6.3a6.5 6.5 0 0 1 0 11.4" />
      <path d="M8 9h2.4a1.5 1.5 0 0 1 0 3H8zM8 12h2.8a1.5 1.5 0 0 1 0 3H8zM8 9v6M9.3 7.8V9M9.3 15v1.2" />
    </>
  ),
};

const DEPOSITS = [
  { icon: 'card', method: 'Debit / Credit Card', time: 'Instant' },
  { icon: 'bank', method: 'Bank Transfer', time: 'Up to 1 Hour' },
  { icon: 'wallet', method: 'E-Wallets', time: 'Instant' },
  { icon: 'crypto', method: 'Crypto (USDT)', time: 'Instant' },
];

const WITHDRAWALS = [
  { icon: 'bank', method: 'Bank Transfer', time: 'Up to 24 Hours' },
  { icon: 'wallet', method: 'E-Wallets', time: 'Instant' },
  { icon: 'crypto', method: 'Crypto (USDT)', time: 'Instant' },
];

function MethodTable({ rows, label }) {
  return (
    <div className="pay-table reveal">
      <table aria-label={label}>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">Processing Time</th>
            <th scope="col">Minimum</th>
            <th scope="col">Fee from us</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.method}>
              <th scope="row">
                <span className="pay-ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[r.icon]}
                  </svg>
                </span>
                {r.method}
              </th>
              <td>
                <span className={r.time === 'Instant' ? 'pay-time instant' : 'pay-time'}>
                  {r.time}
                </span>
              </td>
              <td>$100</td>
              <td>None</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DepositsWithdrawals() {
  return (
    <>
      <PageHero
        className="ph-streak"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Trading' },
          { label: 'Deposits & Withdrawals' },
        ]}
        title={
          <>
            Deposits <span className="gold-amp">&amp;</span> Withdrawals
          </>
        }
        intro="Payout speed above all. Fund in minutes, withdraw with ease."
      />

      <section className="section pay-section">
        <div className="container">
          <h2 className="pay-h2 reveal">Deposit Methods</h2>
          <MethodTable rows={DEPOSITS} label="Deposit methods" />

          <h2 className="pay-h2 reveal" style={{ marginTop: 56 }}>
            Withdrawal Methods
          </h2>
          <MethodTable rows={WITHDRAWALS} label="Withdrawal methods" />

          <p className="pay-note reveal">
            Withdrawals go back to the same method you deposited with - an anti-fraud rule that
            protects your account. The minimum withdrawal is <b>$100</b>, and NexTrade Prime charges
            no deposit or withdrawal fee (your bank or wallet provider may charge its own).
          </p>

          <ol className="withdraw-steps">
            <li>
              <b>Request</b> a withdrawal from your client area.
            </li>
            <li>
              <b>Review</b> - we check it against your verified details.
            </li>
            <li>
              <b>Paid</b> back to the method you deposited with.
            </li>
          </ol>
          <div className="grid3" style={{ marginTop: '28px' }}>
            <div className="card reveal">
              <h3>Fast payouts</h3>
              <p>
                E-wallet and crypto withdrawals are instant; bank transfers arrive within 24
                hours.
              </p>
            </div>
            <div className="card reveal">
              <h3>No fee from us</h3>
              <p>
                NexTrade Prime charges no deposit or withdrawal fee. Your bank or wallet provider
                may charge its own fee.
              </p>
            </div>
            <div className="card reveal">
              <h3>Same-method rule</h3>
              <p>
                Withdrawals go back to the method used to deposit, in line with
                anti-money-laundering rules.
              </p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            Questions about a payment?{' '}
            <Link to="/contact" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Contact support →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
