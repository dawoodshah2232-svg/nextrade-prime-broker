// Stats band — verbatim port of the old index.html stats-band. The four
// stats count up via the shared CountUp component, matching the old
// data-count / data-prefix / data-suffix / data-decimals attributes
// (1000+, 0.0, 1:1000, 24/7). Stat icons are inlined verbatim (white
// stroke) — they are not the gold header/footer icons.
import CountUp from '../CountUp';

export default function StatsBand() {
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        <div className="stat reveal">
          <div className="stat-ico">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
            </svg>
          </div>
          <b>
            <CountUp end={1000} suffix="+" />
          </b>
          <span>Instruments to trade</span>
        </div>
        <div className="stat reveal">
          <div className="stat-ico">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19a9 9 0 1 1 16 0" />
              <path d="M12 15l4.2-4.2" />
              <circle cx="12" cy="15" r="1.7" fill="#fff" stroke="none" />
            </svg>
          </div>
          <b>
            <CountUp end={0} decimals={1} />
          </b>
          <span>Spreads from (pips)</span>
        </div>
        <div className="stat reveal">
          <div className="stat-ico">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M16 21h3a2 2 0 0 0 2-2v-3M8 21H5a2 2 0 0 1-2-2v-3" />
            </svg>
          </div>
          <b>
            <CountUp end={1000} prefix="1:" grouping={false} />
          </b>
          <span>Maximum leverage</span>
        </div>
        <div className="stat reveal">
          <div className="stat-ico">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 13a8 8 0 0 1 16 0" />
              <rect x="2.5" y="13" width="4.5" height="7" rx="2" />
              <rect x="17" y="13" width="4.5" height="7" rx="2" />
              <path d="M20 20a3.5 3.5 0 0 1-3.5 3h-3" />
            </svg>
          </div>
          <b>
            <CountUp end={24} suffix="/7" />
          </b>
          <span>Support, every day</span>
        </div>
      </div>
    </section>
  );
}
