// Full conversion of markets/gold.html from ~/workspace/nextrade-old-html/
// (the gold page IS the metals content; route /markets/metals). The flat
// markets-metals.html is byte-for-byte identical in body content — verified
// by diff, modulo ../ path prefixes — so the placeholder's source note and
// this one describe the same page. The green check SVGs are copied verbatim
// from the old page (not part of the gold icon set in ../components/icons.jsx).
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#067647" strokeWidth="3">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function MarketsMetals() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Markets', to: '/markets' },
          { label: 'Metals' },
        ]}
        title="Metals trading"
        intro="Gold and silver — the classic hedge — traded as CFDs on MT5 with tight spreads and leverage up to 1:500."
      />

      <section className="section">
        <div className="container">
          <div className="market-tabs">
            <Link to="/markets">All Markets</Link>
            <Link to="/markets/forex">Forex</Link>
            <Link to="/markets/metals" className="active">
              Metals
            </Link>
            <Link to="/markets/indices">Indices</Link>
            <Link to="/markets/crypto">Crypto</Link>
            <Link to="/markets/energies">Energies</Link>
          </div>
          <div className="table-wrap reveal">
            <table>
              <tbody>
                <tr>
                  <th>Instrument</th>
                  <th>Spread from</th>
                  <th>Leverage up to</th>
                  <th>Min lot</th>
                  <th>Trading hours</th>
                </tr>
                <tr>
                  <td>
                    <b>XAU/USD</b> — Gold
                  </td>
                  <td>0.12</td>
                  <td>1:500</td>
                  <td>0.01</td>
                  <td>23/5</td>
                </tr>
                <tr>
                  <td>
                    <b>XAG/USD</b> — Silver
                  </td>
                  <td>0.02</td>
                  <td>1:500</td>
                  <td>0.01</td>
                  <td>23/5</td>
                </tr>
                <tr>
                  <td>
                    <b>XAU/EUR</b> — Gold / Euro
                  </td>
                  <td>0.25</td>
                  <td>1:500</td>
                  <td>0.01</td>
                  <td>23/5</td>
                </tr>
                <tr>
                  <td>
                    <b>XPT/USD</b> — Platinum
                  </td>
                  <td>0.60</td>
                  <td>1:200</td>
                  <td>0.01</td>
                  <td>23/5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid2" style={{ marginTop: '48px' }}>
            <div className="split-img reveal">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&auto=format&fit=crop"
                alt="Candlestick trading chart on a screen"
              />
            </div>
            <div className="reveal">
              <h2>Why traders trade gold</h2>
              <p className="lead" style={{ marginBottom: '16px' }}>
                Gold moves on inflation data, interest-rate expectations and risk sentiment —
                and it moves a lot. That is why it is the most-traded metal on MT5.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  <span>
                    <b>Trade from 0.01 lots</b> — gold from a few dollars of margin.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Trade the news</b> — NFP, CPI and Fed decisions move gold fast.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Hedge your portfolio</b> — gold often rises when stocks fall.
                  </span>
                </li>
              </ul>
              <Link className="btn btn-gold" style={{ marginTop: '18px' }} to="/signup">
                Trade Gold Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
