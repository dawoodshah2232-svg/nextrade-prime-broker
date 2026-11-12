// Homepage — full conversion of the old index.html, in the old page's
// order: hero, promo cards, price strip, spreads, why, stats, markets
// tabs, video, steps, accounts, MT5, duo, FAQ, support, final CTA.
// The price strip (ticker) lives on the homepage ONLY — it is built here
// from usePrices(), with the 7-quote list duplicated once for the
// seamless marquee loop, exactly as the old script.js did.
import Hero from '../components/home/Hero';
import PromoCards from '../components/home/PromoCards';
import SpreadsTable from '../components/home/SpreadsTable';
import WhyCards from '../components/home/WhyCards';
import StatsBand from '../components/home/StatsBand';
import MarketsTabs from '../components/home/MarketsTabs';
import VideoSection from '../components/home/VideoSection';
import Steps from '../components/home/Steps';
import AccountsPreview from '../components/home/AccountsPreview';
import MT5Section from '../components/home/MT5Section';
import DuoSection from '../components/home/DuoSection';
import FaqSection from '../components/home/FaqSection';
import SupportCards from '../components/home/SupportCards';
import CtaSection from '../components/home/CtaSection';
import { formatPrice, priceNote, usePrices } from '../lib/prices';

const TICKER_SYMBOLS = ['EUR/USD', 'GBP/USD', 'XAU/USD', 'BTC/USD', 'ETH/USD', 'USD/JPY', 'US30'];

// % change only ever comes from a real previous close: pct === null means
// no previous close, so the slot shows an em dash — never a fabricated %.
function chgOf(s) {
  if (s.pct !== null && s.pct !== undefined && isFinite(s.pct)) {
    return {
      text: (s.pct >= 0 ? '+' : '') + s.pct.toFixed(2) + '%',
      cls: 'chg ' + (s.pct >= 0 ? 'up' : 'down'),
    };
  }
  return { text: '—', cls: 'chg na' };
}

function PriceStrip() {
  const { prices, live, sources } = usePrices();
  const note = priceNote(live, sources);
  // Duplicated once for the seamless marquee loop (old script.js did the
  // same by doubling the track's innerHTML).
  const quotes = [...TICKER_SYMBOLS, ...TICKER_SYMBOLS];

  return (
    <div className="price-strip">
      <div className="container">
        <span className="strip-note" id="strip-note" title={note.title}>
          {note.text}
        </span>
        <div className="ticker" aria-label="Market prices">
          <div className="ticker-track" id="ticker-track">
            {quotes.map((sym, i) => {
              const s = prices[sym];
              const chg = chgOf(s);
              return (
                <div
                  key={sym + '-' + i}
                  className="quote"
                  data-symbol={sym}
                  data-live={s.live ? 'live' : 'sim'}
                >
                  <span>{sym}</span>
                  <b className="val">{formatPrice(s.p, s.d)}</b>
                  <span className={chg.cls}>{chg.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <PromoCards />
      <PriceStrip />
      <SpreadsTable />
      <WhyCards />
      <StatsBand />
      <MarketsTabs />
      <VideoSection />
      <Steps />
      <AccountsPreview />
      <MT5Section />
      <DuoSection />
      <FaqSection />
      <SupportCards />
      <CtaSection />
    </>
  );
}
