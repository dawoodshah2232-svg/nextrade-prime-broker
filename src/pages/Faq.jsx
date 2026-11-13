// Converted from faq.html (~/workspace/nextrade-old-html/) - all 10
// questions and answers verbatim, rendered with <FaqAccordion>. Answers
// that contain a link use JSX with <Link>; plain-text answers are strings.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import FaqAccordion from '../components/FaqAccordion';

const items = [
  {
    q: 'How do I open an account?',
    a: (
      <>
        Register on the <Link to="/signup">sign-up page</Link>, verify your identity with an ID
        and proof of address, then deposit from $100. Most accounts are verified within a few
        hours.
      </>
    ),
  },
  {
    q: 'What is the minimum deposit?',
    a: (
      <>
        $100 on every account type - Standard, ECN, PRO, VIP and Islamic. The minimum withdrawal is also $100. See the full comparison on{' '}
        <Link to="/accounts">Account Types</Link>.
      </>
    ),
  },
  {
    q: 'What is the minimum trade size?',
    a: '0.01 lots on forex, metals and energies - 0.10 lots on indices. That keeps gold and forex accessible from a small account.',
  },
  {
    q: 'Can I use Expert Advisors?',
    a: 'Yes. EAs, scalping and hedging are allowed on all account types on MT5.',
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
    q: 'What documents do I need for verification?',
    a: 'A government-issued photo ID (passport or national ID) and a proof of address dated within the last 3 months, such as a utility bill or bank statement.',
  },
  {
    q: 'Can I change my leverage?',
    a: 'Yes, from your client area at any time. Lower leverage means more margin per trade - most traders use less than the maximum.',
  },
  {
    q: 'Is there a demo account?',
    a: (
      <>
        Yes - $10,000 virtual funds, live prices, full MT5, no time limit. See{' '}
        <Link to="/demo-account">Demo Account</Link>.
      </>
    ),
  },
  {
    q: 'Do you offer Islamic accounts?',
    a: (
      <>
        Yes. Swap-free trading is available on every account type at no extra cost, and every new live account trades swap-free for its first week. See{' '}
        <Link to="/islamic-accounts">Islamic Accounts</Link>.
      </>
    ),
  },
  {
    q: 'Which platform do you offer?',
    a: (
      <>
        MetaTrader 5 only - desktop, web and mobile. See{' '}
        <Link to="/platforms-mt5">MT5 Platform</Link>.
      </>
    ),
  },
  {
    q: 'What is the maximum leverage?',
    a: 'Up to 1:1000 on every account type - Standard, ECN, PRO, VIP and Islamic - subject to the account, instrument and trading conditions. Higher leverage magnifies losses as well as gains.',
  },
  {
    q: 'What promotions are available?',
    a: (
      <>
        A 30% bonus on your first deposit, a 10% bonus on every re-deposit, and swap-free trading
        for your first week. Bonus terms, eligibility and trading requirements apply - see{' '}
        <Link to="/promotions">Promotions</Link>.
      </>
    ),
  },
  {
    q: 'What is the minimum withdrawal?',
    a: (
      <>
        $100. Withdrawals go back to the method you deposited with. See{' '}
        <Link to="/deposits-withdrawals">Deposits &amp; Withdrawals</Link>.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Support' },
          { label: 'FAQ' },
        ]}
        title="Frequently asked questions"
        intro={
          <>
            Straight answers. Anything else - ask us on{' '}
            <Link to="/contact" style={{ color: '#fff', fontWeight: 700 }}>
              Contact Us
            </Link>
            .
          </>
        }
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <FaqAccordion items={items} />
        </div>
      </section>
    </>
  );
}
