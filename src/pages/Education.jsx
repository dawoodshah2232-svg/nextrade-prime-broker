// Converted from education.html in ~/workspace/nextrade-old-html/ -
// verbatim copy, sections and classes; internal links are <Link> routes.
// The live-sessions heading keeps id="live" - the header links to
// /education#live. The table gains an explicit <tbody> (the browser
// inserts one in the old page's DOM anyway, so the rendered output is
// identical; it only silences React's DOM-nesting warning).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function Education() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Discover' },
          { label: 'Education' },
        ]}
        title="Learning centre"
        intro="Free courses, live sessions and guides - from your first trade to advanced risk management."
      />

      <section className="section">
        <div className="container">
          <h2>Start here</h2>
          <div className="grid3" style={{ marginTop: '24px' }}>
            <div className="card reveal">
              <span className="tag">Beginner</span>
              <h3>How trading works</h3>
              <p>
                What a CFD is, how leverage and margin work, and what actually moves prices.
                Read it before your first trade.
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Beginner</span>
              <h3>Your first trade on MT5</h3>
              <p>
                Open MT5, find EUR/USD, set your lot size, place a market order and set a stop
                loss - step by step.
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Beginner</span>
              <h3>Risk management basics</h3>
              <p>
                Position sizing, the 1% rule, and why a stop loss is not optional. The lesson
                that saves accounts.
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Intermediate</span>
              <h3>Reading charts</h3>
              <p>
                Support and resistance, trendlines, candlestick patterns and the indicators
                that actually help.
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Intermediate</span>
              <h3>Trading the news</h3>
              <p>
                NFP, CPI and rate decisions - how to read the{' '}
                <Link to="/economic-calendar" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                  economic calendar
                </Link>{' '}
                and plan around events.
              </p>
            </div>
            <div className="card reveal">
              <span className="tag">Advanced</span>
              <h3>Building a trading plan</h3>
              <p>
                Entries, exits, risk per trade and a journal. A plan you can follow on a bad
                day is worth more than a good idea.
              </p>
            </div>
          </div>

          <h2 id="live" style={{ marginTop: '64px' }}>
            Live education
          </h2>
          <p className="sub reveal">
            Live market sessions and webinars every week, hosted by our analysts. Bring your
            questions - the chat is open during every session.
          </p>
          <div className="table-wrap reveal" style={{ marginTop: '24px' }}>
            <table>
              <tbody>
                <tr>
                  <th>Session</th>
                  <th>When</th>
                  <th>Level</th>
                </tr>
                <tr>
                  <td>
                    <b>Market open briefing</b> - the week ahead
                  </td>
                  <td>Mondays, 09:00 GMT</td>
                  <td>All levels</td>
                </tr>
                <tr>
                  <td>
                    <b>Live trading: London session</b>
                  </td>
                  <td>Tuesdays, 08:00 GMT</td>
                  <td>Intermediate</td>
                </tr>
                <tr>
                  <td>
                    <b>Gold in focus</b> - XAU/USD technicals
                  </td>
                  <td>Wednesdays, 13:00 GMT</td>
                  <td>Intermediate</td>
                </tr>
                <tr>
                  <td>
                    <b>Risk clinic</b> - position sizing live
                  </td>
                  <td>Thursdays, 15:00 GMT</td>
                  <td>All levels</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '24px' }}>
            Practice everything you learn on a{' '}
            <Link to="/demo-account" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              demo account
            </Link>{' '}
            first. And read the daily notes on{' '}
            <Link to="/news-analysis" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              News and Analysis
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
