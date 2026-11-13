// "New to trading?" / "Already trading?" duo - verbatim port of the old
// index.html section that sits between the MT5 split and the FAQ. (It was
// not in the task's numbered list, but it is in the old homepage, so a
// faithful port keeps it - same copy, same photos, same links.)
import { Link } from 'react-router-dom';

export default function DuoSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid2 duo-glow">
          <div className="card reveal duo-new">
            <div className="duo-photo">
              <img
                src="https://images.unsplash.com/photo-1579225663317-c0251b4369bc?auto=format&fit=crop&w=1200&q=80"
                alt="Young trader learning at a desk with two laptops showing candlestick charts"
                loading="lazy"
              />
            </div>
            <h3>New to trading?</h3>
            <p>
              Start with a demo account and the Learning Centre. Learn how markets move, how
              leverage works and how to place your first order - with $10,000 of virtual funds and
              zero risk.
            </p>
            <Link className="btn btn-gold" style={{ marginTop: 16 }} to="/education">
              Start Learning
            </Link>
          </div>
          <div className="card reveal duo-pro">
            <div className="duo-photo">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
                alt="Experienced trader's desk from above - laptops with trading charts, notebook and coffee"
                loading="lazy"
              />
            </div>
            <h3>Already trading?</h3>
            <p>
              Move to ECN for spreads from 0.0 pips, or PRO for near-raw spreads with no
              commission. Your history and open positions stay exactly where they are.
            </p>
            <Link className="btn btn-gold" style={{ marginTop: 16 }} to="/accounts">
              See ECN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
