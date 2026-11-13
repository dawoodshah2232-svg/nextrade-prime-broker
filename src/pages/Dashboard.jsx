// Dashboard - converted from dashboard.html (~/workspace/nextrade-old-html/).
// The old page had NO page hero, so the placeholder's PageHero is dropped;
// the section below is the whole page, as before.
// All figures are the old page's SIMULATED demo data, copied verbatim -
// nothing invented, nothing live. The old dashboard had no data-count
// elements, so no CountUp; its "Current" prices are static demo values,
// not the live feed, so no usePrices.
// Not logged in → <Navigate to="/login" replace />. No logout button here:
// the auth-aware header already shows "Hi, <name>" + Log Out.
// NOTE: the old script.js REMOVED the demo-note banner once a user was
// logged in. It is kept here verbatim per the conversion spec ("keep the
// DEMO labelling the old page had") - the page is only reachable logged in,
// so without it the demo labelling would be gone entirely.
import { Link, Navigate } from 'react-router-dom';
import { getUser } from '../lib/auth';

export default function Dashboard() {
  const user = getUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="section soft">
      <div className="container">
        <div className="demo-note">
          <b>DEMO CLIENT AREA - SIMULATED DATA ONLY.</b> No real money, no real positions. Log in
          from{' '}
          <Link to="/login" style={{ fontWeight: 700 }}>
            login
          </Link>{' '}
          or{' '}
          <Link to="/signup" style={{ fontWeight: 700 }}>
            sign up
          </Link>{' '}
          to see your name here.
        </div>
        <p style={{ color: 'var(--muted)', marginBottom: 8 }}>
          Welcome back, {user.name || user.email}.
        </p>
        <h2 style={{ marginBottom: 20 }}>Your accounts</h2>
        <div className="dash-grid">
          <div className="dash-card">
            <small>Total balance</small>
            <b>$10,842.50</b>
            <span className="pos">+$342.50 this week</span>
          </div>
          <div className="dash-card">
            <small>Equity</small>
            <b>$10,917.20</b>
            <span>Free margin $8,412.00</span>
          </div>
          <div className="dash-card">
            <small>Open positions</small>
            <b>3</b>
            <span>2 long · 1 short</span>
          </div>
          <div className="dash-card">
            <small>Pending withdrawal</small>
            <b>$0.00</b>
            <span>Last withdrawal: $500, 9 Nov</span>
          </div>
        </div>

        <div className="panel">
          <h3>Open positions (demo)</h3>
          <div className="table-wrap">
            <table>
              <tbody>
                <tr>
                  <th>Instrument</th>
                  <th>Type</th>
                  <th>Volume</th>
                  <th>Open price</th>
                  <th>Current</th>
                  <th>Profit</th>
                </tr>
                <tr>
                  <td>
                    <b>XAU/USD</b>
                  </td>
                  <td>Buy</td>
                  <td>0.10</td>
                  <td>4,198.20</td>
                  <td>4,231.40</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>+$332.00</td>
                </tr>
                <tr>
                  <td>
                    <b>EUR/USD</b>
                  </td>
                  <td>Buy</td>
                  <td>0.50</td>
                  <td>1.1580</td>
                  <td>1.1637</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>+$285.00</td>
                </tr>
                <tr>
                  <td>
                    <b>BTC/USD</b>
                  </td>
                  <td>Sell</td>
                  <td>0.05</td>
                  <td>98,400</td>
                  <td>97,419</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>+$49.05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h3>Your trading accounts</h3>
          <div className="table-wrap">
            <table>
              <tbody>
                <tr>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Leverage</th>
                  <th>Platform</th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <b>NT-102481</b>
                  </td>
                  <td>Standard</td>
                  <td>$10,842.50</td>
                  <td>1:1000</td>
                  <td>MT5</td>
                  <td>
                    <Link to="/platforms/mt5" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                      Open MT5 →
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>NT-102482</b>
                  </td>
                  <td>Demo - $10,000 virtual</td>
                  <td>$9,860.00</td>
                  <td>1:1000</td>
                  <td>MT5</td>
                  <td>
                    <Link to="/demo-account" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                      Reset demo →
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" to="/accounts">
              Open Another Account
            </Link>
            {'\u00a0\u00a0'}
            <Link className="btn btn-ghost" to="/deposits-withdrawals">
              Deposit / Withdraw
            </Link>
          </p>
        </div>

        <div className="panel">
          <h3>Quick links</h3>
          <p>
            <Link to="/economic-calendar" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Economic calendar →
            </Link>
            {'\u00a0·\u00a0'}
            <Link to="/calculators" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Calculators →
            </Link>
            {'\u00a0·\u00a0'}
            <Link to="/news-analysis" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              News and analysis →
            </Link>
            {'\u00a0·\u00a0'}
            <Link to="/promotions" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Promotions →
            </Link>
            {'\u00a0·\u00a0'}
            <Link to="/help-centre" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Help Centre →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
