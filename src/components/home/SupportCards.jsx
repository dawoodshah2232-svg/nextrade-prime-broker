// "Support & resources" — three photo-top cards, verbatim port of the
// old index.html section. The first photo is the Wikimedia URL from the
// old markup; Help Centre and Education photos are local assets via
// asset(). Icon SVGs copied verbatim.
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';

export default function SupportCards() {
  return (
    <section className="section soft">
      <div className="container">
        <h2 className="reveal">Support &amp; resources</h2>
        <p className="sub reveal">Real people and real answers, whenever you need them.</p>
        <div className="grid3" style={{ marginTop: 32 }}>
          <div className="card reveal fund-card why-card">
            <div className="fund-photo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Call_center_PV.jpg"
                alt="Support agent wearing a headset with a microphone, helping a customer at her desk"
                loading="lazy"
              />
            </div>
            <div className="icon3d">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 11-3.2-6.9" />
                <path d="M8 12h.01M12 12h.01M16 12h.01" />
              </svg>
            </div>
            <h3>24/7 support</h3>
            <p>
              Real people, 24/7, by live chat and email. Average first response is measured in
              minutes, not days.
            </p>
            <Link className="btn btn-gold btn-sm" style={{ marginTop: 16 }} to="/contact">
              Contact Us
            </Link>
          </div>
          <div className="card reveal fund-card why-card">
            <div className="fund-photo">
              <img
                src={asset('help-centre.jpg')}
                alt="Smiling support agent wearing a headset, helping a customer at her desk"
                loading="lazy"
              />
            </div>
            <div className="icon3d">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="37" fill="#fdf3d0" />
                <circle cx="40" cy="40" r="24" stroke="#c9a227" strokeWidth="3" />
                <path
                  d="M32 32a8 8 0 1 1 12 7c-2.5 2.5-4 3-4 7M40 58h.01"
                  stroke="#c9a227"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>Help Centre</h3>
            <p>
              Answers to the questions traders actually ask — accounts, funding, verification and
              the platform.
            </p>
            <Link className="btn btn-gold btn-sm" style={{ marginTop: 16 }} to="/help-centre">
              Visit Help Centre
            </Link>
          </div>
          <div className="card reveal fund-card why-card">
            <div className="fund-photo">
              <img
                src={asset('education.jpg')}
                alt="Student learning online — taking notes at a laptop with earphones in"
                loading="lazy"
              />
            </div>
            <div className="icon3d">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="37" fill="#fdf3d0" />
                <path
                  d="M20 32l20-9 20 9-20 9-20-9z"
                  stroke="#c9a227"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M28 38v12c0 4 5.5 7 12 7s12-3 12-7V38"
                  stroke="#c9a227"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>Education</h3>
            <p>
              Courses for every level, live sessions and market notes — learn how markets move
              before you risk a cent.
            </p>
            <Link className="btn btn-gold" style={{ marginTop: 16 }} to="/education">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
