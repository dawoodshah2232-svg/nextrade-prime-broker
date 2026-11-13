// "Questions, answered" — the six homepage FAQs, verbatim from the old
// index.html, rendered through the shared FaqAccordion. Answers with
// links use JSX with <Link>; plain answers are verbatim strings.
import { Link } from 'react-router-dom';
import FaqAccordion from '../FaqAccordion';

const ITEMS = [
  {
    q: 'How do I open an account?',
    a: 'Register on the sign-up page, verify your identity with an ID and proof of address, then deposit from $100. Most accounts are verified within a few hours.',
  },
  {
    q: 'What is the minimum deposit?',
    a: (
      <>
        $100 on every account type — Standard, ECN, PRO, VIP and Islamic. The minimum withdrawal is also $100. See the full comparison on{' '}
        <Link to="/accounts">Account Types</Link>.
      </>
    ),
  },
  {
    q: 'What is the minimum trade size?',
    a: '0.01 lots on forex, metals and energies — 0.10 lots on indices. That keeps gold and forex accessible from a small account.',
  },
  {
    q: 'How long do withdrawals take?',
    a: (
      <>
        Requests are processed the same business day. Card and e-wallet withdrawals usually arrive
        within 24 hours; bank transfers take 1–3 business days. Details on{' '}
        <Link to="/deposits-withdrawals">Deposits &amp; Withdrawals</Link>.
      </>
    ),
  },
  {
    q: 'Is there a demo account?',
    a: (
      <>
        Yes — $10,000 virtual funds, live prices, full MT5, no time limit. See{' '}
        <Link to="/demo-account">Demo Account</Link>.
      </>
    ),
  },
  {
    q: 'Which platform do you offer?',
    a: (
      <>
        MetaTrader 5 only — desktop, web and mobile. See{' '}
        <Link to="/platforms/mt5">MT5 Platform</Link>.
      </>
    ),
  },
];

export default function FaqSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">Questions, answered</h2>
        <p className="sub reveal">
          The six questions every new trader asks. More in the{' '}
          <Link to="/faq" style={{ fontWeight: 700, color: 'var(--ink)' }}>
            full FAQ
          </Link>
          .
        </p>
        <div style={{ marginTop: 32, maxWidth: 820 }}>
          <FaqAccordion items={ITEMS} />
        </div>
      </div>
    </section>
  );
}
