// Final CTA band - verbatim port of the old index.html closing section.
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band reveal">
          <h2>Ready to trade?</h2>
          <p>Open a live account in minutes, or practice first on a demo.</p>
          <Link className="btn btn-gold" to="/signup">
            Open an Account
          </Link>
          &nbsp;&nbsp;
          <Link className="btn btn-outline-light" to="/demo-account">
            Try a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
