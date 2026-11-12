// Converted from help-centre.html (~/workspace/nextrade-old-html/) — copy,
// sections and classes verbatim. Six link cards in a grid3; all links are
// <Link> to canonical routes.
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const linkStyle = { fontWeight: 700, color: 'var(--ink)' };

export default function HelpCentre() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Support' },
          { label: 'Help Centre' },
        ]}
        title="Help centre"
        intro={
          <>
            Answers to the questions traders actually ask. Still stuck?{' '}
            <Link to="/contact" style={{ color: '#fff', fontWeight: 700 }}>
              Contact us
            </Link>{' '}
            — we answer 24/7.
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid3">
            <div className="card reveal">
              <h3>Getting started</h3>
              <p>
                <Link to="/faq" style={linkStyle}>
                  How do I open an account?
                </Link>
              </p>
              <p>
                <Link to="/demo-account" style={linkStyle}>
                  How does the demo account work?
                </Link>
              </p>
              <p>
                <Link to="/accounts" style={linkStyle}>
                  Which account type should I choose?
                </Link>
              </p>
            </div>
            <div className="card reveal">
              <h3>Deposits &amp; withdrawals</h3>
              <p>
                <Link to="/deposits-withdrawals" style={linkStyle}>
                  How do I deposit?
                </Link>
              </p>
              <p>
                <Link to="/deposits-withdrawals" style={linkStyle}>
                  How long do withdrawals take?
                </Link>
              </p>
              <p>
                <Link to="/deposits-withdrawals" style={linkStyle}>
                  Which payment methods are accepted?
                </Link>
              </p>
            </div>
            <div className="card reveal">
              <h3>Trading &amp; MT5</h3>
              <p>
                <Link to="/platforms-mt5" style={linkStyle}>
                  How do I install MT5?
                </Link>
              </p>
              <p>
                <Link to="/faq" style={linkStyle}>
                  What is the minimum trade size?
                </Link>
              </p>
              <p>
                <Link to="/faq" style={linkStyle}>
                  Can I use Expert Advisors?
                </Link>
              </p>
            </div>
            <div className="card reveal">
              <h3>Verification</h3>
              <p>
                <Link to="/faq" style={linkStyle}>
                  What documents do I need?
                </Link>
              </p>
              <p>
                <Link to="/faq" style={linkStyle}>
                  How long does verification take?
                </Link>
              </p>
            </div>
            <div className="card reveal">
              <h3>Accounts</h3>
              <p>
                <Link to="/islamic-accounts" style={linkStyle}>
                  How do Islamic accounts work?
                </Link>
              </p>
              <p>
                <Link to="/accounts" style={linkStyle}>
                  Can I change my leverage?
                </Link>
              </p>
            </div>
            <div className="card reveal">
              <h3>Still need help?</h3>
              <p>
                Live chat is available 24/7 after you{' '}
                <Link to="/login" style={linkStyle}>
                  log in
                </Link>
                , or send a message via{' '}
                <Link to="/contact" style={linkStyle}>
                  Contact Us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
