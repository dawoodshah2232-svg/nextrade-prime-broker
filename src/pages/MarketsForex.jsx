// Full conversion of markets/forex.html from ~/workspace/nextrade-old-html/
// (the folder copy is canonical; the flat markets-forex.html is byte-for-byte
// identical in body content - verified by diff, modulo ../ path prefixes).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function MarketsForex() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Markets', to: '/markets' },
          { label: 'Forex' },
        ]}
        title="Forex trading"
        intro="60+ currency pairs on MT5. Majors, minors and exotics - trade 24 hours a day, five days a week."
      />

      <section className="section">
        <div className="container">
          <div className="market-tabs">
            <Link to="/markets">All Markets</Link>
            <Link to="/markets/forex" className="active">
              Forex
            </Link>
            <Link to="/markets/metals">Metals</Link>
            <Link to="/markets/indices">Indices</Link>
            <Link to="/markets/crypto">Crypto</Link>
            <Link to="/markets/energies">Energies</Link>
          </div>
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th>Pair</th>
                  <th>Spread from</th>
                  <th>Leverage up to</th>
                  <th>Min lot</th>
                  <th>Trading hours</th>
                </tr>
                <tr>
                  <td>
                    <b>EUR/USD</b>
                  </td>
                  <td>0.0 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
                <tr>
                  <td>
                    <b>GBP/USD</b>
                  </td>
                  <td>0.1 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
                <tr>
                  <td>
                    <b>USD/JPY</b>
                  </td>
                  <td>0.1 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
                <tr>
                  <td>
                    <b>USD/CHF</b>
                  </td>
                  <td>0.2 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
                <tr>
                  <td>
                    <b>AUD/USD</b>
                  </td>
                  <td>0.2 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
                <tr>
                  <td>
                    <b>USD/CAD</b>
                  </td>
                  <td>0.2 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
                <tr>
                  <td>
                    <b>EUR/GBP</b>
                  </td>
                  <td>0.3 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
                <tr>
                  <td>
                    <b>EUR/JPY</b>
                  </td>
                  <td>0.3 pips</td>
                  <td>1:1000</td>
                  <td>0.01</td>
                  <td>24/5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '16px', color: 'var(--muted)' }}>
            Spreads shown are minimums on ECN accounts and can widen around news and at
            market open. See the full comparison on{' '}
            <Link to="/accounts" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Account Types
            </Link>
            .
          </p>
          <div className="grid3" style={{ marginTop: '40px' }}>
            <div className="card reveal">
              <h3>Majors</h3>
              <p>
                EUR/USD, GBP/USD, USD/JPY and the other most-traded pairs - deepest liquidity,
                tightest spreads.
              </p>
            </div>
            <div className="card reveal">
              <h3>Minors</h3>
              <p>EUR/GBP, EUR/JPY, GBP/JPY and more - cross pairs with no US dollar leg.</p>
            </div>
            <div className="card reveal">
              <h3>Exotics</h3>
              <p>
                USD/ZAR, USD/TRY, USD/MXN and others - bigger moves, wider spreads, smaller
                sizes.
              </p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            <Link className="btn btn-gold" to="/signup">
              Trade Forex Now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
