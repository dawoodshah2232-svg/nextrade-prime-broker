// Converted from contact.html (~/workspace/nextrade-old-html/) — copy,
// sections and classes verbatim. The old form's inline onsubmit (prevent
// default, show #contact-done, reset the form) is ported to a React
// onSubmit handler with useState; the #contact-done element keeps its id,
// class and demo text and stays in the DOM (display toggled, as before).
// All field ids (c-name, c-email, c-topic, c-msg) are kept.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company' },
          { label: 'Contact Us' },
        ]}
        title="Contact us"
        intro="Real people, 24/7. Live chat is fastest — email works too, and we answer within a few hours."
      />

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="form-card reveal">
              <h3>Send us a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="c-name">Your name</label>
                  <input id="c-name" required />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" required />
                </div>
                <div className="field">
                  <label htmlFor="c-topic">Topic</label>
                  <select id="c-topic">
                    <option>Account opening</option>
                    <option>Deposits &amp; withdrawals</option>
                    <option>Trading / MT5</option>
                    <option>Islamic accounts</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" rows="5" required />
                </div>
                <button className="btn btn-gold" type="submit">
                  Send Message
                </button>
              </form>
              <p
                id="contact-done"
                className="demo-note"
                style={{ display: sent ? 'block' : 'none', marginTop: 16 }}
              >
                Thank you — your message has been received (demo). Our team will reply by email.
              </p>
            </div>
            <div className="reveal">
              <h2>Other ways to reach us</h2>
              <div className="card" style={{ marginTop: 16 }}>
                <h3>Live chat</h3>
                <p>
                  Available 24/7 from any page — look for the chat button in your client area after
                  you{' '}
                  <Link to="/login" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                    log in
                  </Link>
                  .
                </p>
              </div>
              <div className="card" style={{ marginTop: 16 }}>
                <h3>Email</h3>
                <p>
                  Use the contact form below and our team will reply — for account, payment and
                  platform questions.
                </p>
              </div>
              <div className="card" style={{ marginTop: 16 }}>
                <h3>Help Centre</h3>
                <p>
                  Most questions are already answered in the{' '}
                  <Link to="/help-centre" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                    Help Centre
                  </Link>{' '}
                  and{' '}
                  <Link to="/faq" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                    FAQ
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
