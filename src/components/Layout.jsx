// Site shell: top strip + header + page + footer, on every route.
// The top strip sat above the header on all 34 old pages (same text).
// useReveal(pathname) re-runs the scroll-reveal observer after every
// navigation, so newly mounted sections/cards animate in.
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useReveal } from '../hooks/useReveal';

export default function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);
  return (
    <>
      <div className="topstrip">
        <div className="container">
          <span>Trade with confidence — spreads from 0.0 pips on Raw Spread accounts</span>
          <span>
            English &nbsp;·&nbsp; <Link to="/help-centre">Help Centre</Link>
          </span>
        </div>
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
