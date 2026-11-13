// Converted from economic-calendar.html in ~/workspace/nextrade-old-html/ -
// verbatim copy, table and cards; internal links are <Link> routes.
// The table gains an explicit <tbody> (the browser inserts one in the old
// page's DOM anyway, so the rendered output is identical; it only silences
// React's DOM-nesting warning).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function EconomicCalendar() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Discover' },
          { label: 'Economic Calendar' },
        ]}
        title="Economic calendar"
        intro="The events that move markets - NFP, CPI, rate decisions and more. All times in GMT. Check it before you trade."
      />

      <section className="section">
        <div className="container">
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th>Time (GMT)</th>
                  <th>Event</th>
                  <th>Country</th>
                  <th>Impact</th>
                  <th>Moves</th>
                </tr>
                <tr>
                  <td>
                    <b>Mon 09:00</b>
                  </td>
                  <td>Market open briefing - week ahead</td>
                  <td>Global</td>
                  <td>
                    <span className="tag">Medium</span>
                  </td>
                  <td>All markets</td>
                </tr>
                <tr>
                  <td>
                    <b>Tue 13:30</b>
                  </td>
                  <td>US CPI - inflation data</td>
                  <td>USA</td>
                  <td>
                    <span className="tag gold">High</span>
                  </td>
                  <td>USD, gold, US indices</td>
                </tr>
                <tr>
                  <td>
                    <b>Wed 15:30</b>
                  </td>
                  <td>US crude oil inventories</td>
                  <td>USA</td>
                  <td>
                    <span className="tag gold">High</span>
                  </td>
                  <td>WTI, Brent</td>
                </tr>
                <tr>
                  <td>
                    <b>Wed 19:00</b>
                  </td>
                  <td>FOMC interest rate decision</td>
                  <td>USA</td>
                  <td>
                    <span className="tag gold">High</span>
                  </td>
                  <td>USD, gold, US indices</td>
                </tr>
                <tr>
                  <td>
                    <b>Thu 12:00</b>
                  </td>
                  <td>Bank of England rate decision</td>
                  <td>UK</td>
                  <td>
                    <span className="tag gold">High</span>
                  </td>
                  <td>GBP pairs, UK100</td>
                </tr>
                <tr>
                  <td>
                    <b>Thu 13:30</b>
                  </td>
                  <td>US retail sales</td>
                  <td>USA</td>
                  <td>
                    <span className="tag">Medium</span>
                  </td>
                  <td>USD pairs</td>
                </tr>
                <tr>
                  <td>
                    <b>Fri 13:30</b>
                  </td>
                  <td>US Non-Farm Payrolls (NFP)</td>
                  <td>USA</td>
                  <td>
                    <span className="tag gold">High</span>
                  </td>
                  <td>USD, gold, US indices</td>
                </tr>
                <tr>
                  <td>
                    <b>Fri 15:00</b>
                  </td>
                  <td>University of Michigan consumer sentiment</td>
                  <td>USA</td>
                  <td>
                    <span className="tag">Medium</span>
                  </td>
                  <td>USD pairs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '16px', color: 'var(--muted)' }}>
            This is a sample weekly schedule showing the regular high-impact releases. Exact
            dates shift each month - the live calendar in your client area always shows the
            current week. Spreads can widen and slippage can occur around high-impact releases;
            consider reducing size or standing aside if you are new.
          </p>
          <div className="grid3" style={{ marginTop: '40px' }}>
            <div className="card reveal">
              <h3>Plan around red events</h3>
              <p>
                High-impact releases move markets in seconds. Know when they land before you
                open a position.
              </p>
            </div>
            <div className="card reveal">
              <h3>Size for volatility</h3>
              <p>
                Use the{' '}
                <Link to="/calculators" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                  calculators
                </Link>{' '}
                to check pip value and margin before trading a news event.
              </p>
            </div>
            <div className="card reveal">
              <h3>Learn the pattern</h3>
              <p>
                The{' '}
                <Link to="/education" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                  Learning Centre
                </Link>{' '}
                explains how NFP and CPI actually move prices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
