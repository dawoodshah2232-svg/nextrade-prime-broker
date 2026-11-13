// Full conversion of markets.html from ~/workspace/nextrade-old-html/
// (markets overview). The market-tabs here link to the canonical routes
// (/markets/forex etc.); "All Markets" is the active tab on this page.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function Markets() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Trading' },
          { label: 'Markets' },
        ]}
        title="Markets"
        intro="1,000+ instruments on one MT5 account. Pick a market below to see spreads, leverage and trading hours."
      />

      <section className="section">
        <div className="container">
          <div className="market-tabs">
            <Link to="/markets" className="active">
              All Markets
            </Link>
            <Link to="/markets/forex">Forex</Link>
            <Link to="/markets/metals">Metals</Link>
            <Link to="/markets/indices">Indices</Link>
            <Link to="/markets/crypto">Crypto</Link>
            <Link to="/markets/energies">Energies</Link>
          </div>
          <div className="grid3">
            <div className="card reveal">
              <h3>Forex</h3>
              <p>
                60+ currency pairs, majors, minors and exotics. Trade 24 hours a day, five
                days a week, with spreads from 0.0 pips on ECN.
              </p>
              <Link to="/markets/forex" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Trade Forex →
              </Link>
            </div>
            <div className="card reveal">
              <h3>Metals</h3>
              <p>
                Gold and silver against the dollar and euro. The classic hedge, with deep
                liquidity and tight spreads around the clock.
              </p>
              <Link to="/markets/metals" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Trade Metals →
              </Link>
            </div>
            <div className="card reveal">
              <h3>Indices</h3>
              <p>
                US30, US500, NAS100, GER40, UK100 and more. Trade the whole market in a single
                position.
              </p>
              <Link to="/markets/indices" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Trade Indices →
              </Link>
            </div>
            <div className="card reveal">
              <h3>Crypto</h3>
              <p>
                Bitcoin, Ethereum and major altcoins, traded as CFDs with leverage up to 1:20
                — no wallet needed.
              </p>
              <Link to="/markets/crypto" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Trade Crypto →
              </Link>
            </div>
            <div className="card reveal">
              <h3>Energies</h3>
              <p>
                WTI and Brent crude oil and natural gas. Trade supply, demand and the news that
                moves them.
              </p>
              <Link to="/markets/energies" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Trade Energies →
              </Link>
            </div>
            <div className="card reveal">
              <h3>All on MT5</h3>
              <p>
                Every market above trades on the same MetaTrader 5 account, with the same
                login, charts and order types.
              </p>
              <Link to="/platforms/mt5" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Explore MT5 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
