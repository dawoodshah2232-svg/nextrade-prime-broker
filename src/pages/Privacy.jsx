// Converted from privacy.html (~/workspace/nextrade-old-html/) — copy,
// sections and classes verbatim.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function Privacy() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company' },
          { label: 'Privacy Policy' },
        ]}
        title="Privacy Policy"
        intro="How NexTrade Prime handles information on this website."
      />

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 760 }}>
            <h2>What we collect</h2>
            <p className="lead" style={{ marginBottom: 16 }}>
              This website is a demonstration front-end. The demo sign-up and login forms store the
              name and email you type in your own browser (localStorage) so the demo client area
              can greet you. That information is not sent to NexTrade Prime or to any third party
              by this site.
            </p>
            <h2>What we do not collect</h2>
            <p style={{ marginBottom: 16 }}>
              We do not collect payment details, identity documents, or trading account credentials
              on this website. Do not enter real account passwords or card details here — account
              opening, deposits and trading are simulated in this demo.
            </p>
            <h2>Cookies and analytics</h2>
            <p style={{ marginBottom: 16 }}>
              This demo does not set tracking cookies and does not run analytics. Prices shown on
              the homepage are fetched live in your browser from free public market-data APIs
              (CoinGecko, ExchangeRate-API and Frankfurter); gold and US30 show simulated prices
              because their free feeds do not connect from a browser. Those services receive your
              request directly, as any public website visitor would.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about this policy?{' '}
              <Link to="/contact" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                Talk to us →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
