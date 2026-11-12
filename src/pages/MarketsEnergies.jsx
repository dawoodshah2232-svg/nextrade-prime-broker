// Full conversion of markets/energies.html from ~/workspace/nextrade-old-html/
// (the folder copy is canonical; the flat markets-energies.html is
// byte-for-byte identical in body content — verified by diff, modulo ../
// path prefixes).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function MarketsEnergies() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Markets', to: '/markets' },
          { label: 'Energies' },
        ]}
        title="Energies trading"
        intro="WTI and Brent crude oil and natural gas — trade supply, demand and the inventory reports that move them, on MT5."
      />

      <section className="section">
        <div className="container">
          <div className="market-tabs">
            <Link to="/markets">All Markets</Link>
            <Link to="/markets/forex">Forex</Link>
            <Link to="/markets/metals">Metals</Link>
            <Link to="/markets/indices">Indices</Link>
            <Link to="/markets/crypto">Crypto</Link>
            <Link to="/markets/energies" className="active">
              Energies
            </Link>
          </div>
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th>Instrument</th>
                  <th>Spread from</th>
                  <th>Leverage up to</th>
                  <th>Min lot</th>
                </tr>
                <tr>
                  <td>
                    <b>WTI</b> — US crude oil
                  </td>
                  <td>0.03</td>
                  <td>1:200</td>
                  <td>0.01</td>
                </tr>
                <tr>
                  <td>
                    <b>Brent</b> — Brent crude oil
                  </td>
                  <td>0.03</td>
                  <td>1:200</td>
                  <td>0.01</td>
                </tr>
                <tr>
                  <td>
                    <b>NGAS</b> — Natural gas
                  </td>
                  <td>0.01</td>
                  <td>1:200</td>
                  <td>0.01</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid3" style={{ marginTop: '40px' }}>
            <div className="card reveal">
              <h3>WTI vs Brent</h3>
              <p>
                WTI tracks US supply; Brent tracks the global market. Watch the spread between
                them — it tells you where the pressure is.
              </p>
            </div>
            <div className="card reveal">
              <h3>Inventory Wednesdays</h3>
              <p>
                US crude inventory data lands on Wednesdays and regularly moves oil by a dollar
                or more in minutes.
              </p>
            </div>
            <div className="card reveal">
              <h3>Trade the range</h3>
              <p>
                Oil spends long stretches in a range. Range traders buy support and sell
                resistance — with a stop, always.
              </p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            <Link className="btn btn-gold" to="/signup">
              Trade Energies Now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
