// Full conversion of markets/indices.html from ~/workspace/nextrade-old-html/
// (the folder copy is canonical; the flat markets-indices.html is
// byte-for-byte identical in body content - verified by diff, modulo ../
// path prefixes).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function MarketsIndices() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Markets', to: '/markets' },
          { label: 'Indices' },
        ]}
        title="Indices trading"
        intro="Trade the whole market in a single position - US30, US500, NAS100, GER40, UK100 and more, on MT5."
      />

      <section className="section">
        <div className="container">
          <div className="market-tabs">
            <Link to="/markets">All Markets</Link>
            <Link to="/markets/forex">Forex</Link>
            <Link to="/markets/metals">Metals</Link>
            <Link to="/markets/indices" className="active">
              Indices
            </Link>
            <Link to="/markets/crypto">Crypto</Link>
            <Link to="/markets/energies">Energies</Link>
          </div>
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th>Index</th>
                  <th>Spread from</th>
                  <th>Leverage up to</th>
                  <th>Min lot</th>
                </tr>
                <tr>
                  <td>
                    <b>US30</b> - Dow Jones
                  </td>
                  <td>2.0 points</td>
                  <td>1:200</td>
                  <td>0.10</td>
                </tr>
                <tr>
                  <td>
                    <b>US500</b> - S&amp;P 500
                  </td>
                  <td>0.4 points</td>
                  <td>1:200</td>
                  <td>0.10</td>
                </tr>
                <tr>
                  <td>
                    <b>NAS100</b> - Nasdaq 100
                  </td>
                  <td>1.5 points</td>
                  <td>1:200</td>
                  <td>0.10</td>
                </tr>
                <tr>
                  <td>
                    <b>GER40</b> - DAX
                  </td>
                  <td>1.5 points</td>
                  <td>1:200</td>
                  <td>0.10</td>
                </tr>
                <tr>
                  <td>
                    <b>UK100</b> - FTSE 100
                  </td>
                  <td>1.5 points</td>
                  <td>1:200</td>
                  <td>0.10</td>
                </tr>
                <tr>
                  <td>
                    <b>JPN225</b> - Nikkei 225
                  </td>
                  <td>8.0 points</td>
                  <td>1:200</td>
                  <td>0.10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid3" style={{ marginTop: '40px' }}>
            <div className="card reveal">
              <h3>Trade the trend</h3>
              <p>
                Indices trend for weeks at a time. Follow the US session open and the trend,
                not the noise.
              </p>
            </div>
            <div className="card reveal">
              <h3>Trade the news</h3>
              <p>
                CPI, NFP and Fed decisions move US indices in minutes. Check the{' '}
                <Link to="/economic-calendar" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                  economic calendar
                </Link>{' '}
                first.
              </p>
            </div>
            <div className="card reveal">
              <h3>Trade both ways</h3>
              <p>Go long in a rally or short in a sell-off - CFDs work in both directions.</p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            <Link className="btn btn-gold" to="/signup">
              Trade Indices Now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
