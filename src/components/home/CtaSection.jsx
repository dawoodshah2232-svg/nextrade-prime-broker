// Final CTA band - verbatim port of the old index.html closing section.
import { Link } from 'react-router-dom';
import { REGISTER_URL } from '../../lib/links';

export default function CtaSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band reveal">
          <h2>Ready to trade?</h2>
          <p>Open a live account in minutes, or practice first on a demo.</p>
          <a className="btn btn-gold" href={REGISTER_URL}>
            Open an Account
          </a>
          &nbsp;&nbsp;
          <Link className="btn btn-outline-light" to="/demo-account">
            Try a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
