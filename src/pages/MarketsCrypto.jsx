// Full conversion of markets/crypto.html from ~/workspace/nextrade-old-html/
// (the folder copy is canonical; the flat markets-crypto.html is
// byte-for-byte identical in body content - verified by diff, modulo ../
// path prefixes).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function MarketsCrypto() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Markets', to: '/markets' },
          { label: 'Crypto' },
        ]}
        title="Crypto trading"
        intro="Bitcoin, Ethereum and major altcoins as CFDs - no wallet, no exchange account, just your MT5 login. Trade 24/7."
      />

      <section className="section">
        <div className="container">
          <div className="market-tabs">
            <Link to="/markets">All Markets</Link>
            <Link to="/markets/forex">Forex</Link>
            <Link to="/markets/metals">Metals</Link>
            <Link to="/markets/indices">Indices</Link>
            <Link to="/markets/crypto" className="active">
              Crypto
            </Link>
            <Link to="/markets/energies">Energies</Link>
          </div>
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th>Crypto CFD</th>
                  <th>Spread from</th>
                  <th>Leverage up to</th>
                  <th>Min lot</th>
                  <th>Trading hours</th>
                </tr>
                <tr>
                  <td>
                    <b>BTC/USD</b> - Bitcoin
                  </td>
                  <td>$25</td>
                  <td>1:20</td>
                  <td>0.01</td>
                  <td>24/7</td>
                </tr>
                <tr>
                  <td>
                    <b>ETH/USD</b> - Ethereum
                  </td>
                  <td>$2.50</td>
                  <td>1:20</td>
                  <td>0.01</td>
                  <td>24/7</td>
                </tr>
                <tr>
                  <td>
                    <b>LTC/USD</b> - Litecoin
                  </td>
                  <td>$0.80</td>
                  <td>1:20</td>
                  <td>0.01</td>
                  <td>24/7</td>
                </tr>
                <tr>
                  <td>
                    <b>XRP/USD</b> - Ripple
                  </td>
                  <td>$0.01</td>
                  <td>1:20</td>
                  <td>0.01</td>
                  <td>24/7</td>
                </tr>
                <tr>
                  <td>
                    <b>SOL/USD</b> - Solana
                  </td>
                  <td>$0.40</td>
                  <td>1:20</td>
                  <td>0.01</td>
                  <td>24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid3" style={{ marginTop: '40px' }}>
            <div className="card reveal">
              <h3>No wallet needed</h3>
              <p>
                You never hold the coin. You trade the price, long or short, from the same MT5
                account as your forex trades.
              </p>
            </div>
            <div className="card reveal">
              <h3>Trade both ways</h3>
              <p>
                Crypto falls as fast as it rises. CFDs let you short Bitcoin just as easily as
                going long.
              </p>
            </div>
            <div className="card reveal">
              <h3>Size it small</h3>
              <p>
                0.01 lots and 1:20 leverage keep crypto's big moves manageable. Use a stop on
                every trade - crypto gaps.
              </p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            <Link className="btn btn-gold" to="/signup">
              Trade Crypto Now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
