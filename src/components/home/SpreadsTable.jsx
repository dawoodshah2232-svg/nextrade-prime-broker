// Spreads table — verbatim port of the old index.html #spreads section.
// Flag image URLs are copied verbatim (flagcdn); XAU/BTC use the inline
// SVG/glyph discs from the old markup. The values are DEMO-typical
// published minimums — the caption and footnote say so exactly, and the
// figures are never presented as live data.
export default function SpreadsTable() {
  return (
    <section className="section" id="spreads">
      <div className="container">
        <h2 className="reveal">Spreads that stay honest</h2>
        <p className="sub reveal">
          The minimum spread for each account type, on the instruments traders ask about most.
        </p>
        <div className="table-wrap reveal spreads-wrap" style={{ marginTop: 32 }}>
          <table className="spreads-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Standard</th>
                <th className="best-col">
                  Raw Spread <span className="best-badge">Best</span>
                </th>
                <th>Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="flag-pair">
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/eu.png"
                      alt="European Union flag"
                      loading="lazy"
                    />
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/us.png"
                      alt="United States flag"
                      loading="lazy"
                    />
                  </span>
                  <span className="inst">
                    <b>EUR/USD</b>
                    <span>Euro / US Dollar</span>
                  </span>
                </td>
                <td>from 1.0 pip</td>
                <td className="best-col">from 0.0 pips</td>
                <td>from 0.1 pips</td>
              </tr>
              <tr>
                <td>
                  <span className="flag-pair">
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/gb.png"
                      alt="United Kingdom flag"
                      loading="lazy"
                    />
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/us.png"
                      alt="United States flag"
                      loading="lazy"
                    />
                  </span>
                  <span className="inst">
                    <b>GBP/USD</b>
                    <span>British Pound / US Dollar</span>
                  </span>
                </td>
                <td>from 1.3 pips</td>
                <td className="best-col">from 0.2 pips</td>
                <td>from 0.3 pips</td>
              </tr>
              <tr>
                <td>
                  <span className="flag-pair">
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/us.png"
                      alt="United States flag"
                      loading="lazy"
                    />
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/jp.png"
                      alt="Japan flag"
                      loading="lazy"
                    />
                  </span>
                  <span className="inst">
                    <b>USD/JPY</b>
                    <span>US Dollar / Japanese Yen</span>
                  </span>
                </td>
                <td>from 1.2 pips</td>
                <td className="best-col">from 0.1 pips</td>
                <td>from 0.2 pips</td>
              </tr>
              <tr>
                <td>
                  <span className="flag-pair">
                    <span className="flag flag-au" aria-hidden="true">
                      Au
                    </span>
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/us.png"
                      alt="United States flag"
                      loading="lazy"
                    />
                  </span>
                  <span className="inst">
                    <b>XAU/USD</b>
                    <span>Gold / US Dollar</span>
                  </span>
                </td>
                <td>from $0.35</td>
                <td className="best-col">from $0.15</td>
                <td>from $0.20</td>
              </tr>
              <tr>
                <td>
                  <span className="flag-pair">
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/us.png"
                      alt="United States flag"
                      loading="lazy"
                    />
                    <span className="flag flag-idx" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                      </svg>
                    </span>
                  </span>
                  <span className="inst">
                    <b>US30</b>
                    <span>US Wall Street 30</span>
                  </span>
                </td>
                <td>from 2.8 points</td>
                <td className="best-col">from 1.6 points</td>
                <td>from 2.2 points</td>
              </tr>
              <tr>
                <td>
                  <span className="flag-pair">
                    <span className="flag flag-btc" aria-hidden="true">
                      ₿
                    </span>
                    <img
                      className="flag"
                      src="https://flagcdn.com/w80/us.png"
                      alt="United States flag"
                      loading="lazy"
                    />
                  </span>
                  <span className="inst">
                    <b>BTC/USD</b>
                    <span>Bitcoin / US Dollar</span>
                  </span>
                </td>
                <td>from $28</td>
                <td className="best-col">from $18</td>
                <td>from $22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="small muted reveal" style={{ marginTop: 14 }}>
          Typical spreads — demo. The figures shown are each account type's published minimum
          spread; actual spreads vary by instrument and market conditions. Forex is quoted in
          pips, gold and crypto in dollars, and indices in points. Raw Spread accounts pay $3.50
          per side, per lot; Standard and Pro pay no commission.
        </p>
        <p className="reveal" style={{ marginTop: 18 }}>
          <span className="tag gold">Every account</span>&nbsp; Negative balance protection — your
          balance can never go below zero, whatever the market does.
        </p>
      </div>
    </section>
  );
}
