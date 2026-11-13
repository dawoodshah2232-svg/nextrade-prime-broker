// Site shell: top strip + header + page + footer, on every route.
// The top strip carries the motto and the language selector (visible on
// desktop and mobile). useReveal(pathname) re-runs the scroll-reveal
// observer after every navigation, so newly mounted sections animate in.
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LanguageSelect from './LanguageSelect';
import { useReveal } from '../hooks/useReveal';

export default function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);
  return (
    <>
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
