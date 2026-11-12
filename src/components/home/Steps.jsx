// "Start trading today" — three steps, verbatim port of the old
// index.html section. Ghost numerals, badges and connectors are
// markup/classes only — the global stylesheet already handles them.
// Step icons are inlined verbatim (white stroke).
export default function Steps() {
  return (
    <section className="section soft">
      <div className="container">
        <h2 className="reveal">Start trading today</h2>
        <p className="sub reveal">Three steps. Most traders are trading within the hour.</p>
        <div className="steps" style={{ marginTop: 32 }}>
          <div className="step reveal" data-ghost="01">
            <div className="step-ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="10" cy="8" r="4" />
                <path d="M3.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" />
                <path d="M18 8h4M20 6v4" />
              </svg>
            </div>
            <div className="step-num">01</div>
            <h3>Open an account</h3>
            <p>Choose Standard, Raw Spread or Pro. Registration takes about two minutes.</p>
          </div>
          <div className="step reveal" data-ghost="02">
            <div className="step-ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2.5" y="5" width="19" height="14" rx="2" />
                <path d="M2.5 10h19M6 15h4" />
              </svg>
            </div>
            <div className="step-num">02</div>
            <h3>Fund in minutes</h3>
            <p>Verify your identity, then deposit from $10 by card, bank transfer or e-wallet.</p>
          </div>
          <div className="step reveal" data-ghost="03">
            <div className="step-ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2.5" y="4" width="19" height="12" rx="2" />
                <path d="M8 20h8M12 16v4M7 12l2.5-3 2 2 3-4" />
              </svg>
            </div>
            <div className="step-num">03</div>
            <h3>Trade on MT5</h3>
            <p>Download MT5, log in with your account, and place your first trade.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
