// Full conversion of deposits-withdrawals.html from ~/workspace/nextrade-old-html/.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function DepositsWithdrawals() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Trading' },
          { label: 'Deposits & Withdrawals' },
        ]}
        title="Deposits & withdrawals"
        intro="Fund in minutes, withdraw the same day. No deposit or withdrawal fee from NexTrade Prime."
      />

      <section className="section">
        <div className="container">
          <h2>Deposit methods</h2>
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th>Method</th>
                  <th>Processing time</th>
                  <th>Minimum</th>
                  <th>Fee from us</th>
                </tr>
                <tr>
                  <td>
                    <b>Debit / credit card</b>
                  </td>
                  <td>Instant</td>
                  <td>$10</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>
                    <b>Bank transfer</b>
                  </td>
                  <td>1–2 business days</td>
                  <td>$10</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>
                    <b>E-wallets</b>
                  </td>
                  <td>Instant</td>
                  <td>$10</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>
                    <b>USDT (TRC20)</b>
                  </td>
                  <td>Up to 1 hour</td>
                  <td>$10</td>
                  <td>None</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 style={{ marginTop: '48px' }}>Withdrawals</h2>
          <p className="reveal">
            Withdraw to the same method you deposited with — this is an anti-fraud rule that
            protects your account. Requests submitted before the daily cut-off are processed
            the same business day; card and e-wallet withdrawals usually arrive within 24
            hours, bank transfers within 1–3 business days depending on your bank.
          </p>
          <div className="grid3" style={{ marginTop: '28px' }}>
            <div className="card reveal">
              <h3>Same-day processing</h3>
              <p>Withdrawal requests are reviewed and processed the same business day.</p>
            </div>
            <div className="card reveal">
              <h3>No fee from us</h3>
              <p>
                NexTrade Prime charges no deposit or withdrawal fee. Your bank or wallet
                provider may charge its own fee.
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
