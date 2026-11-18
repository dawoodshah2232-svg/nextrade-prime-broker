import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LOGIN_URL, REGISTER_URL } from './lib/links';
import Layout from './components/Layout';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import DemoAccount from './pages/DemoAccount';
import IslamicAccounts from './pages/IslamicAccounts';
import DepositsWithdrawals from './pages/DepositsWithdrawals';
import Markets from './pages/Markets';
import MarketsForex from './pages/MarketsForex';
import MarketsMetals from './pages/MarketsMetals';
import MarketsIndices from './pages/MarketsIndices';
import MarketsCrypto from './pages/MarketsCrypto';
import MarketsEnergies from './pages/MarketsEnergies';
import Platforms from './pages/Platforms';
import PlatformsMt5 from './pages/PlatformsMt5';
import Education from './pages/Education';
import EconomicCalendar from './pages/EconomicCalendar';
import Calculators from './pages/Calculators';
import NewsAnalysis from './pages/NewsAnalysis';
import Promotions from './pages/Promotions';
import Partners from './pages/Partners';
import About from './pages/About';
import Regulation from './pages/Regulation';
import Contact from './pages/Contact';
import HelpCentre from './pages/HelpCentre';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// The old site was separate HTML files, so every navigation started at the
// top of the page. In the SPA we reproduce that on every route change -
// except for hash links (e.g. /education#live), which scroll to the anchor.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Full-page redirect to the client portal (replace: no back-button loop).
function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/demo-account" element={<DemoAccount />} />
          <Route path="/islamic-accounts" element={<IslamicAccounts />} />
          <Route path="/deposits-withdrawals" element={<DepositsWithdrawals />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/forex" element={<MarketsForex />} />
          <Route path="/markets/metals" element={<MarketsMetals />} />
          <Route path="/markets/indices" element={<MarketsIndices />} />
          <Route path="/markets/crypto" element={<MarketsCrypto />} />
          <Route path="/markets/energies" element={<MarketsEnergies />} />
          {/* The old markets/gold.html was a duplicate of the metals page. */}
          <Route path="/markets/gold" element={<Navigate to="/markets/metals" replace />} />
          {/* Flat aliases from the old site - canonical routes are /markets/*. */}
          <Route path="/markets-forex" element={<Navigate to="/markets/forex" replace />} />
          <Route path="/markets-metals" element={<Navigate to="/markets/metals" replace />} />
          <Route path="/markets-indices" element={<Navigate to="/markets/indices" replace />} />
          <Route path="/markets-crypto" element={<Navigate to="/markets/crypto" replace />} />
          <Route path="/markets-energies" element={<Navigate to="/markets/energies" replace />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/platforms/mt5" element={<PlatformsMt5 />} />
          <Route path="/platforms-mt5" element={<Navigate to="/platforms/mt5" replace />} />
          <Route path="/education" element={<Education />} />
          <Route path="/economic-calendar" element={<EconomicCalendar />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/news-analysis" element={<NewsAnalysis />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/ib" element={<Navigate to="/partners" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/regulation" element={<Regulation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help-centre" element={<HelpCentre />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Register / login / client area live on the secure portal. Old
              links and bookmarks to these paths are sent there. */}
          <Route path="/login" element={<ExternalRedirect to={LOGIN_URL} />} />
          <Route path="/signup" element={<ExternalRedirect to={REGISTER_URL} />} />
          <Route path="/register" element={<ExternalRedirect to={REGISTER_URL} />} />
          <Route path="/dashboard" element={<ExternalRedirect to={LOGIN_URL} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
