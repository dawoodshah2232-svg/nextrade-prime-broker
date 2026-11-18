// Site shell: top strip + header + page + footer, on every route.
// The top strip carries the motto and the language selector (visible on
// desktop and mobile). useReveal(pathname) tags each new page's content
// with AOS attributes after every navigation (see hooks/useReveal), then
// AOS.refreshHard() animates them in on scroll. ScrollUi adds the reading
// progress bar and the back-to-top button.
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './Header';
import Footer from './Footer';
import LanguageSelect from './LanguageSelect';
import ScrollUi from './ScrollUi';
import { useReveal } from '../hooks/useReveal';

export default function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);

  // AOS drives the [data-aos] animations on newer pages (e.g. /partners).
  // Init once; on every navigation refreshHard() re-scans the new route's
  // DOM so freshly mounted elements get their offsets.
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);
  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);
  return (
    <>
      <ScrollUi />
      <div className="topstrip">
        <div className="container">
          <span className="topstrip-msg">
            <b>Payout speed above all</b>
            <span className="topstrip-extra">
              {' '}
              · Leverage up to 1:1000 · 30% first-deposit bonus
            </span>
          </span>
          <span className="topstrip-right">
            <LanguageSelect />
            <a className="topstrip-email" href="mailto:info@nextradeprime.com">
              info@nextradeprime.com
            </a>
            <Link to="/help-centre">Help Centre</Link>
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
