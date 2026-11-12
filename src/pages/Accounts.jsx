// Full conversion of accounts.html from ~/workspace/nextrade-old-html/.
// Account types + comparison table, copied verbatim (Standard $10 / from
// 1.0 pip / no commission, Raw $100 / from 0.0 pips / $3.50 per side per
// lot, Pro $500 / from 0.1 pips / no commission; all 1:500).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

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
        intro="Three accounts, one platform. Every account trades on MT5 with negative balance protection, hedging allowed and EAs welcome."
      />

      <section className="section">
        <div className="container">
          <div className="grid3">
            <div className="card reveal acct-card acct-standard">
              <span className="tag">Most popular</span>
              <h3>Standard</h3>
              <p>Simple pricing with no commission. The right start for most traders.</p>
              <p style={{ marginTop: '14px' }}>
                <b style={{ color: 'var(--ink)', fontSize: '1.8rem' }}>$10</b> minimum deposit
              </p>
              <ul className="check-list">
                <li>
                  <span>Spreads from 1.0 pip</span>
                </li>
                <li>
                  <span>No commission</span>
                </li>
                <li>
                  <span>Leverage up to 1:500</span>
                </li>
                <li>
                  <span>Minimum lot 0.01</span>
                </li>
              </ul>
              <Link className="btn btn-gold" style={{ marginTop: '16px' }} to="/signup">
                Open Standard
              </Link>
            </div>
            <div className="card reveal acct-card acct-raw">
              <span className="tag gold">Tightest spreads</span>
              <h3>Raw Spread</h3>
              <p>
                Spreads from 0.0 pips with a small commission per lot. Built for active traders
                and scalpers.
              </p>
              <p style={{ marginTop: '14px' }}>
                <b style={{ color: 'var(--ink)', fontSize: '1.8rem' }}>$100</b> minimum deposit
              </p>
              <ul className="check-list">
                <li>
                  <span>Spreads from 0.0 pips</span>
                </li>
                <li>
                  <span>$3.50 commission per side, per lot</span>
                </li>
                <li>
                  <span>Leverage up to 1:500</span>
                </li>
                <li>
                  <span>Minimum lot 0.01</span>
                </li>
              </ul>
              <Link className="btn btn-gold" style={{ marginTop: '16px' }} to="/signup">
                Open Raw Spread
              </Link>
            </div>
            <div className="card reveal acct-card acct-pro">
              <span className="tag">For professionals</span>
              <h3>Pro</h3>
              <p>Near-raw spreads with no commission, for larger balances and higher volume.</p>
              <p style={{ marginTop: '14px' }}>
                <b style={{ color: 'var(--ink)', fontSize: '1.8rem' }}>$500</b> minimum deposit
              </p>
              <ul className="check-list">
                <li>
                  <span>Spreads from 0.1 pips</span>
                </li>
                <li>
                  <span>No commission</span>
                </li>
                <li>
                  <span>Leverage up to 1:500</span>
                </li>
                <li>
                  <span>Minimum lot 0.01</span>
                </li>
              </ul>
              <Link className="btn btn-gold" style={{ marginTop: '16px' }} to="/signup">
                Open Pro
              </Link>
            </div>
          </div>

          <h2 style={{ marginTop: '64px' }}>Compare accounts</h2>
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Standard</th>
                  <th>Raw Spread</th>
                  <th>Pro</th>
                </tr>
                <tr>
                  <td>Minimum deposit</td>
                  <td>
                    <b>$10</b>
                  </td>
                  <td>
                    <b>$100</b>
                  </td>
                  <td>
                    <b>$500</b>
                  </td>
                </tr>
                <tr>
                  <td>Spreads from</td>
                  <td>
                    <b>1.0 pip</b>
                  </td>
                  <td>
                    <b>0.0 pips</b>
                  </td>
                  <td>
                    <b>0.1 pips</b>
                  </td>
                </tr>
                <tr>
                  <td>Commission</td>
                  <td>No commission</td>
                  <td>$3.50 per side, per lot</td>
                  <td>No commission</td>
                </tr>
                <tr>
                  <td>Leverage up to</td>
                  <td>
                    <b>1:500</b>
                  </td>
                  <td>
                    <b>1:500</b>
                  </td>
                  <td>
                    <b>1:500</b>
                  </td>
                </tr>
                <tr>
                  <td>Minimum lot</td>
                  <td>0.01</td>
                  <td>0.01</td>
                  <td>0.01</td>
                </tr>
                <tr>
                  <td>Stop-out level</td>
                  <td>20%</td>
                  <td>20%</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>Swap-free option</td>
                  <td>Available</td>
                  <td>Available</td>
                  <td>Available</td>
                </tr>
                <tr>
                  <td>Expert Advisors</td>
                  <td>Allowed</td>
                  <td>Allowed</td>
                  <td>Allowed</td>
                </tr>
                <tr>
                  <td>Negative balance protection</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Hedging</td>
                  <td>Allowed</td>
                  <td>Allowed</td>
                  <td>Allowed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '20px' }}>
            Not sure which fits? Start with a{' '}
            <Link to="/demo-account" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              demo account
            </Link>{' '}
            — it costs nothing, and you can open a live account of any type later. Need
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
          <div className="cta-band reveal">
            <h2>Open your account today</h2>
            <p>Registration takes about two minutes. Deposit from $10 and trade on MT5.</p>
            <Link className="btn btn-gold" to="/signup">
              Open an Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
