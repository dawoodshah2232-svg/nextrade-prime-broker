// Partners & IBs - introducing-broker programme: per-lot rebate on every
// lot referred clients trade, plus a share of the commission charged on
// ECN accounts. Animated with AOS (see Layout), so the root carries
// data-aos-page and the legacy useReveal skips it.
//
// Rates are NOT published on purpose: rebate per lot and commission share
// are set per partner in the IB agreement. The calculator therefore starts
// from clearly-labelled example rates the visitor can change. The only
// fixed number used is the ECN commission from lib/accounts ($3.50/side).
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FaqAccordion from '../components/FaqAccordion';
import CountUp from '../components/CountUp';

const ECN_COMMISSION_RT = 7; // $3.50 per side x 2 sides, per standard lot

const icon = (d) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const ICONS = {
  rebate: icon(
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7" />
      <path d="M20 4v4.7h-4.7" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.3" />
      <path d="M4 20v-4.7h4.7" />
      <path d="M12 8.5v7M14 10h-2.8a1.2 1.2 0 0 0 0 2.4h1.6a1.2 1.2 0 0 1 0 2.4H10" />
    </>,
  ),
  commission: icon(
    <>
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 9 9h-9z" />
      <circle cx="12" cy="12" r="9" />
    </>,
  ),
  link: icon(
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>,
  ),
  chart: icon(
    <>
      <path d="M3 20h18" />
      <path d="M6 16l4-5 3 3 5-7" />
      <path d="M15 7h3v3" />
    </>,
  ),
  wallet: icon(
    <>
      <path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4H5a2.5 2.5 0 0 0 0 5h14a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5H5A2.5 2.5 0 0 1 2.5 17.5v-11" />
      <path d="M16.5 14.5h.01" />
    </>,
  ),
  network: icon(
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2v4.3M12 11.5l-5.6 4.7M12 11.5l5.6 4.7" />
    </>,
  ),
  support: icon(
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19c0 1.5-1.5 2-4 2h-2" />
    </>,
  ),
  materials: icon(
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M7 9h6M7 12h10" />
    </>,
  ),
};

const STREAMS = [
  {
    key: 'rebate',
    label: 'Stream 01',
    title: 'Volume rebate',
    lead: 'A fixed amount paid back to you for every standard lot your referred clients trade.',
    points: [
      'Paid on Standard, ECN, PRO, VIP and Islamic accounts',
      'Counted per closed lot - win or lose, the rebate is the same',
      'Rate per lot agreed in your IB agreement, by instrument group',
    ],
    formula: 'lots traded × rebate per lot',
  },
  {
    key: 'commission',
    label: 'Stream 02',
    title: 'Commission share',
    lead: 'A percentage of the trading commission your clients pay on ECN accounts - on top of the rebate.',
    points: [
      'ECN commission is $3.50 per side, per lot ($7 round turn)',
      'Your share is applied to every commissionable lot',
      'Stacks with the volume rebate on the same trade',
    ],
    formula: 'ECN lots × $7 × your share %',
  },
];

const STEPS = [
  {
    t: 'Apply',
    d: 'Send us a short application: where your audience or clients are and how you plan to refer them.',
  },
  {
    t: 'Get approved',
    d: 'We agree your rebate per lot and commission share, then sign the IB agreement.',
  },
  {
    t: 'Share your link',
    d: 'Every client who registers through your tracking link or IB code is linked to your IB account.',
  },
  {
    t: 'Earn & withdraw',
    d: 'Rebates and commission are credited to your IB wallet. Withdraw by e-wallet, crypto or bank wire.',
  },
];

const TOOLS = [
  {
    i: 'chart',
    t: 'Real-time IB dashboard',
    d: 'Clients, deposits, lots and earnings per account - filter by day, week or month and export to CSV.',
  },
  {
    i: 'link',
    t: 'Tracking links & IB code',
    d: 'Create links per campaign or channel to see which source brings clients who actually trade.',
  },
  {
    i: 'network',
    t: 'Multi-level sub-IBs',
    d: 'Build your own network of sub-IBs and earn an override on the volume they bring in.',
  },
  {
    i: 'wallet',
    t: 'Fast payouts',
    d: 'Payout speed above all - IB withdrawals use the same rails as client withdrawals.',
  },
  {
    i: 'materials',
    t: 'Marketing materials',
    d: 'Banners, landing pages and copy in multiple languages, ready for your site or socials.',
  },
  {
    i: 'support',
    t: 'Dedicated partner manager',
    d: 'One named contact for onboarding, rate reviews, client issues and payout questions.',
  },
];

// Key facts strip under the hero - only verifiable, programme-level facts
// (no invented partner counts or payout totals).
const FACTS = [
  { n: 2, suffix: '', label: 'Income streams on one trade', sub: 'Rebate + commission share' },
  { n: 24, suffix: 'h', label: 'Max. wire payout time', sub: 'E-wallet & crypto: instant' },
  { n: 0, prefix: '$', suffix: '', label: 'Fee from us on payouts', sub: 'Same rails as client withdrawals' },
  { n: 5, suffix: '', label: 'Account types that pay', sub: 'Standard, ECN, PRO, VIP, Islamic' },
];

const PARTNER_TYPES = [
  {
    i: 'link',
    t: 'Introducing Broker',
    d: 'You bring traders directly - from your office, community or personal network - and earn on their volume.',
  },
  {
    i: 'network',
    t: 'Master IB',
    d: 'You recruit and manage sub-IBs. You earn on your own clients plus an override on your network.',
  },
  {
    i: 'materials',
    t: 'Educators & signal providers',
    d: 'You teach or publish analysis. Your students trade with us and you earn from the volume they trade.',
  },
];

const FAQ = [
  {
    q: 'What is the difference between a rebate and commission share?',
    a: 'A rebate is a fixed dollar amount for each standard lot your clients trade, on any account type. Commission share is a percentage of the commission charged on ECN accounts. On an ECN trade you can earn both.',
  },
  {
    q: 'How much can I earn per lot?',
    a: 'Rates are agreed with each partner and depend on the instrument group and the volume you bring. Use the calculator above with your expected rate, then confirm the final figures with the partnerships team before you sign.',
  },
  {
    q: 'Do I earn if my client loses money?',
    a: 'Yes. Your earnings are based on traded volume, not on whether the client wins or loses.',
  },
  {
    q: 'When are rebates and commission paid?',
    a: 'Earnings are credited to your IB wallet as your clients close trades. You can withdraw them with the same methods as a client account - e-wallets and crypto are instant, bank wire transfers are completed within 24 hours.',
  },
  {
    q: 'Can I have sub-IBs?',
    a: 'Yes. Master IBs can invite sub-IBs and earn an override on their volume. The split between you and each sub-IB is set in your dashboard within the limits of your agreement.',
  },
];

const fmtUsd = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function Range({ id, label, value, min, max, step = 1, suffix = '', onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="ib-field">
      <div className="ib-field-top">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>
          {value}
          {suffix}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ '--fill': `${pct}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function EarningsCalculator() {
  const [clients, setClients] = useState(25);
  const [lots, setLots] = useState(10);
  const [ecnShare, setEcnShare] = useState(40);
  const [rebate, setRebate] = useState(5);
  const [commShare, setCommShare] = useState(30);

  const r = useMemo(() => {
    const totalLots = clients * lots;
    const ecnLots = totalLots * (ecnShare / 100);
    const rebateUsd = totalLots * rebate;
    const commUsd = ecnLots * ECN_COMMISSION_RT * (commShare / 100);
    const total = rebateUsd + commUsd;
    return {
      totalLots,
      rebateUsd,
      commUsd,
      total,
      rebatePct: total ? (rebateUsd / total) * 100 : 0,
    };
  }, [clients, lots, ecnShare, rebate, commShare]);

  return (
    <div className="ib-calc" data-aos="fade-up">
      <div className="ib-calc-inputs">
        <Range id="ib-clients" label="Active clients" value={clients} min={1} max={300} onChange={setClients} />
        <Range
          id="ib-lots"
          label="Lots per client / month"
          value={lots}
          min={1}
          max={100}
          onChange={setLots}
        />
        <Range
          id="ib-ecn"
          label="Volume on ECN accounts"
          value={ecnShare}
          min={0}
          max={100}
          step={5}
          suffix="%"
          onChange={setEcnShare}
        />
        <div className="ib-rates">
          <div className="ib-rate">
            <label htmlFor="ib-rebate">Rebate per lot</label>
            <div className="ib-input">
              <span>$</span>
              <input
                id="ib-rebate"
                type="number"
                inputMode="decimal"
                min="0"
                max="50"
                step="0.5"
                value={rebate}
                onChange={(e) => setRebate(Math.max(0, Number(e.target.value) || 0))}
              />
            </div>
          </div>
          <div className="ib-rate">
            <label htmlFor="ib-comm">Commission share</label>
            <div className="ib-input">
              <input
                id="ib-comm"
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                step="5"
                value={commShare}
                onChange={(e) =>
                  setCommShare(Math.min(100, Math.max(0, Number(e.target.value) || 0)))
                }
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <p className="ib-calc-note">
          Rates shown are examples only. Your actual rebate and commission share are set in your IB
          agreement.
        </p>
      </div>

      <div className="ib-calc-out" aria-live="polite">
        <span className="ib-out-label">Estimated monthly earnings</span>
        <strong className="ib-out-total">{fmtUsd(r.total)}</strong>
        <span className="ib-out-sub">
          from {r.totalLots.toLocaleString('en-US')} lots / month
        </span>

        <div className="ib-split" role="img" aria-label="Earnings split between rebate and commission">
          <span style={{ width: `${r.rebatePct}%` }} />
        </div>
        <dl className="ib-breakdown">
          <div>
            <dt>
              <i className="dot dot-rebate" /> Volume rebate
            </dt>
            <dd>{fmtUsd(r.rebateUsd)}</dd>
          </div>
          <div>
            <dt>
              <i className="dot dot-comm" /> ECN commission share
            </dt>
            <dd>{fmtUsd(r.commUsd)}</dd>
          </div>
          <div className="ib-yearly">
            <dt>Per year at this pace</dt>
            <dd>{fmtUsd(r.total * 12)}</dd>
          </div>
        </dl>
        <Link className="btn btn-gold" to="/contact">
          Apply as a Partner
        </Link>
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <div data-aos-page>
      <section className="page-hero ib-hero">
        <div className="container ib-hero-grid">
          <div>
            <p className="breadcrumb">
              <Link to="/">Home</Link>&nbsp;/&nbsp; Company&nbsp;/&nbsp; Partners &amp; IBs
            </p>
            <h1 data-aos="fade-up">
              Partner with NexTrade Prime. <span className="gold-amp">Earn twice</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="100">
              Our Introducing Broker programme pays a volume rebate on every lot your clients trade,
              plus a share of the commission on ECN accounts. Transparent tracking, sub-IB support
              and payouts as fast as our client withdrawals.
            </p>
            <div className="ib-hero-cta" data-aos="fade-up" data-aos-delay="200">
              <Link className="btn btn-gold btn-lg" to="/contact">
                Become a Partner
              </Link>
              <a className="btn btn-outline-light btn-lg" href="#ib-calculator">
                Estimate Earnings
              </a>
            </div>
          </div>

          <div className="ib-hero-card" data-aos="fade-left" data-aos-delay="250">
            <div className="ib-hc-row">
              <span className="ib-hc-ico">{ICONS.rebate}</span>
              <div>
                <b>Rebate</b>
                <span>per lot, every account type</span>
              </div>
              <em>+</em>
            </div>
            <div className="ib-hc-row">
              <span className="ib-hc-ico">{ICONS.commission}</span>
              <div>
                <b>Commission</b>
                <span>share of ECN commission</span>
              </div>
              <em>+</em>
            </div>
            <div className="ib-hc-row">
              <span className="ib-hc-ico">{ICONS.network}</span>
              <div>
                <b>Sub-IB override</b>
                <span>on your partner network</span>
              </div>
              <em>+</em>
            </div>
            <div className="ib-hc-foot">
              <span>Leverage up to 1:1000</span>
              <span>Min. deposit $100</span>
              <span>MT5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="ib-facts">
        <div className="container ib-facts-grid">
          {FACTS.map((f, i) => (
            <div key={f.label} className="ib-fact" data-aos="fade-up" data-aos-delay={i * 90}>
              <b>
                {f.n === 0 ? (
                  (f.prefix || '') + '0'
                ) : (
                  <CountUp end={f.n} prefix={f.prefix || ''} suffix={f.suffix} duration={1200} />
                )}
              </b>
              <span>{f.label}</span>
              <small>{f.sub}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Two income streams */}
      <section className="section ib-streams">
        <div className="container">
          <div className="ib-head" data-aos="fade-up">
            <span className="eyebrow">How you earn</span>
            <h2>Rebate + commission, on the same trade</h2>
            <p className="sub">
              Two separate income streams. The rebate pays on all volume; the commission share adds
              to it whenever your clients trade on ECN.
            </p>
          </div>
          <div className="ib-stream-grid">
            {STREAMS.map((s, i) => (
              <article
                key={s.key}
                className={`ib-stream ib-stream-${s.key}`}
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className="ib-stream-top">
                  <span className="ib-stream-ico">{ICONS[s.key]}</span>
                  <span className="ib-stream-label">{s.label}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.lead}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <code className="ib-formula">{s.formula}</code>
              </article>
            ))}
          </div>

          <div className="ib-example" data-aos="fade-up">
            <span className="ib-example-tag">Example</span>
            <p>
              A client trades <b>2 lots of EUR/USD on an ECN account</b>. With an example rebate of
              $5/lot and a 30% commission share you earn <b>$10 rebate</b> + <b>$4.20 commission</b>{' '}
              (2 × $7 × 30%) = <b>$14.20</b> on that one trade.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section soft ib-calc-section" id="ib-calculator">
        <div className="container">
          <div className="ib-head" data-aos="fade-up">
            <span className="eyebrow">Earnings calculator</span>
            <h2>See what your network could earn</h2>
            <p className="sub">Move the sliders to match your client base.</p>
          </div>
          <EarningsCalculator />
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="ib-head" data-aos="fade-up">
            <span className="eyebrow">Getting started</span>
            <h2>From application to first payout</h2>
          </div>
          <ol className="ib-steps">
            {STEPS.map((s, i) => (
              <li key={s.t} data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="ib-step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Partner types + tools */}
      <section className="section soft">
        <div className="container ib-types-wrap">
          <div className="ib-types">
            <span className="eyebrow">Who it's for</span>
            <h2>One programme, three ways to partner</h2>
            {PARTNER_TYPES.map((p, i) => (
              <div
                key={p.t}
                className="ib-type"
                data-aos="fade-right"
                data-aos-delay={100 + i * 100}
              >
                <span className="ib-type-ico">{ICONS[p.i]}</span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ib-tools">
            {TOOLS.map((t, i) => (
              <div
                key={t.t}
                className="ib-tool"
                data-aos="zoom-in-up"
                data-aos-delay={(i % 2) * 100}
              >
                <span className="ib-tool-ico">{ICONS[t.i]}</span>
                <h3>{t.t}</h3>
                <p>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container ib-faq">
          <div className="ib-head" data-aos="fade-up">
            <span className="eyebrow">Partner FAQ</span>
            <h2>Questions partners ask first</h2>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      <section className="section ib-cta-section">
        <div className="container">
          <div className="cta-band" data-aos="zoom-in">
            <h2>Ready to grow with NexTrade Prime?</h2>
            <p>Tell us about your audience and how you plan to refer clients.</p>
            <Link className="btn btn-gold" to="/contact">
              Apply as a Partner
            </Link>
            &nbsp;&nbsp;
            <Link className="btn btn-outline-light" to="/accounts">
              See Account Types
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
