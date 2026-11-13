// Converted from calculators.html in ~/workspace/nextrade-old-html/ -
// verbatim copy, forms and labels. The pip-value and margin calculators
// are ported from the old assets/script.js (lines ~304-324) as React form
// state, with the formulas and result wording unchanged:
//   pip value: XAU/USD $1, BTC/USD $0.10, otherwise $10 per lot
//   margin = lots × 100,000 × price / leverage
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function Calculators() {
  const [pipPair, setPipPair] = useState('EUR/USD');
  const [pipLots, setPipLots] = useState('1');
  const [pipResult, setPipResult] = useState(null);
  const [mgLots, setMgLots] = useState('1');
  const [mgPrice, setMgPrice] = useState('1.1637');
  const [mgLev, setMgLev] = useState('1000');
  const [marginResult, setMarginResult] = useState(null);

  function calcPip(e) {
    e.preventDefault();
    const lots = parseFloat(pipLots || '1');
    const pipVal = pipPair === 'XAU/USD' ? 1 : pipPair === 'BTC/USD' ? 0.1 : 10;
    setPipResult(
      <>
        Pip value for{' '}
        <b>
          {lots} lot of {pipPair}
        </b>{' '}
        = <b>${(pipVal * lots).toFixed(2)} per pip</b>.
      </>,
    );
  }

  function calcMargin(e) {
    e.preventDefault();
    const lots = parseFloat(mgLots || '1');
    const price = parseFloat(mgPrice || '1');
    const lev = parseFloat(mgLev || '1000');
    const margin = (lots * 100000 * price) / lev;
    setMarginResult(
      <>
        Required margin ={' '}
        <b>
          $
          {margin.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </b>{' '}
        at 1:{lev} leverage.
      </>,
    );
  }

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Discover' },
          { label: 'Calculators' },
        ]}
        title="Trading calculators"
        intro="Know your risk before you place a trade. Pip value and required margin, calculated instantly."
      />

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="form-card reveal">
              <h3>Pip value calculator</h3>
              <form id="pip-calc" onSubmit={calcPip}>
                <div className="field">
                  <label htmlFor="pip-pair">Instrument</label>
                  <select
                    id="pip-pair"
                    value={pipPair}
                    onChange={(e) => setPipPair(e.target.value)}
                  >
                    <option>EUR/USD</option>
                    <option>GBP/USD</option>
                    <option>XAU/USD</option>
                    <option>BTC/USD</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="pip-lots">Lot size</label>
                  <input
                    id="pip-lots"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={pipLots}
                    onChange={(e) => setPipLots(e.target.value)}
                  />
                </div>
                <button className="btn btn-gold" type="submit">
                  Calculate Pip Value
                </button>
              </form>
              <div className="calc-result" id="pip-result">
                {pipResult || 'Enter a lot size to see the pip value.'}
              </div>
            </div>
            <div className="form-card reveal">
              <h3>Margin calculator</h3>
              <form id="margin-calc" onSubmit={calcMargin}>
                <div className="field">
                  <label htmlFor="mg-lots">Lot size</label>
                  <input
                    id="mg-lots"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={mgLots}
                    onChange={(e) => setMgLots(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="mg-price">Current price</label>
                  <input
                    id="mg-price"
                    type="number"
                    step="0.0001"
                    min="0"
                    value={mgPrice}
                    onChange={(e) => setMgPrice(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="mg-lev">Leverage</label>
                  <select id="mg-lev" value={mgLev} onChange={(e) => setMgLev(e.target.value)}>
                    <option value="1000">1:1000</option>
                    <option value="500">1:500</option>
                    <option value="200">1:200</option>
                    <option value="100">1:100</option>
                    <option value="50">1:50</option>
                    <option value="30">1:30</option>
                  </select>
                </div>
                <button className="btn btn-gold" type="submit">
                  Calculate Margin
                </button>
              </form>
              <div className="calc-result" id="margin-result">
                {marginResult || 'Enter your trade details to see the required margin.'}
              </div>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            These calculators use standard contract sizes (100,000 units per forex lot) and are
            indicative only. Your MT5 terminal always shows the exact margin for a live order
            before you confirm it. Learn more in the{' '}
            <Link to="/education" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Learning Centre
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
