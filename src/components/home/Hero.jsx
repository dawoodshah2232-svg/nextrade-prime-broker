// Homepage hero — verbatim port of the <section class="hero …"> block in
// the old index.html, with the heroBackground behaviour from script.js
// (~lines 357-388): reduced motion or viewport <=760px pauses the video
// and shows the poster still; a video error does the same. Autoplay is
// native (attributes on the <video>); JS only retries once, muted, if the
// browser blocked it anyway. NOTE: the YouTube video Dawood picked
// (EEX0EHTTePE) was removed 12 Nov — YouTube refuses it in embedded
// players (Error 153). No iframe / API code here, ever.
// The hero proof row is STATIC in the old markup (no data-count) — only
// the StatsBand counts up. The XAU/USD glass card is live via usePrices.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { formatPrice, usePrices } from '../../lib/prices';

export default function Hero() {
  const { prices } = usePrices();
  const videoRef = useRef(null);
  const [posterOnly, setPosterOnly] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 760px)').matches;
    if (reduced || small) {
      if (video) video.pause();
      setPosterOnly(true);
      return;
    }
    // Autoplay is native. One safety net only: if the browser blocked the
    // autoplay anyway, retry once muted.
    if (video && video.paused) {
      video.muted = true;
      video.play().catch(() => {
        /* stays on poster frame; the error handler covers failure */
      });
    }
  }, []);

  const showPoster = () => {
    if (videoRef.current) videoRef.current.pause();
    setPosterOnly(true);
  };

  const xau = prices['XAU/USD'];

  return (
    <section className="hero hero-blend hero-video">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="hero-bg" aria-hidden="true">
        <video
          ref={videoRef}
          id="hero-video"
          autoPlay={!posterOnly}
          muted
          loop
          playsInline
          preload="auto"
          poster={asset('hero-trader.jpg')}
          src={asset('hero-market.mp4')}
          onError={showPoster}
          style={posterOnly ? { display: 'none' } : undefined}
        ></video>
        <img
          className="poster"
          id="hero-poster"
          src={asset('hero-trader.jpg')}
          alt=""
          loading="eager"
          fetchPriority="high"
          style={posterOnly ? { display: 'block' } : undefined}
        />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Trade on MetaTrader 5</span>
          <h1>
            Trade the markets, <span className="gold">clearly.</span>
          </h1>
          <p className="lead">
            Forex, gold, indices and crypto on MetaTrader 5. Tight spreads, fast execution and
            funding that takes minutes — with an account that fits the way you trade.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-gold btn-lg" to="/signup">
              Open an Account
            </Link>
            <Link className="btn btn-outline-light btn-lg" to="/demo-account">
              Try a Demo
            </Link>
          </div>
          <div className="hero-proof">
            <div>
              <b>1,000+</b>
              <span>Instruments</span>
            </div>
            <div>
              <b>0.0</b>
              <span>Spreads from (pips)</span>
            </div>
            <div>
              <b>1:500</b>
              <span>Max leverage</span>
            </div>
            <div>
              <b>$10</b>
              <span>Minimum deposit</span>
            </div>
          </div>
        </div>
        <div className="glass-card glass-1">
          <div className="gc-label">XAU/USD</div>
          <div className="gc-value" id="hero-xau">
            ${formatPrice(xau.p, xau.d)}
          </div>
          <div className="gc-sub">Gold · MT5</div>
        </div>
      </div>
    </section>
  );
}
