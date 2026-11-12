// Homepage hero — verbatim port of the <section class="hero …"> block in
// the old index.html, with the heroBackground behaviour from script.js
// (~lines 357-388): reduced motion or viewport <=760px pauses the video
// and shows the poster still; a video error does the same. Autoplay is
// native (attributes on the <video>); JS retries until it is actually
// playing (see the effect below) because some browsers block the initial
// autoplay — the QA browser froze the hero on its first frame even with a
// one-shot retry. NOTE: the YouTube video Dawood picked
// (EEX0EHTTePE) was removed 12 Nov — YouTube refuses it in embedded
// players (Error 153). No iframe / API code here, ever.
// The hero proof row is STATIC in the old markup (no data-count) — only
// the StatsBand counts up. The XAU/USD glass card is live via usePrices.
// The <video> element is STABLE across re-renders: same position in the
// tree, no key, and every prop (autoPlay/muted/loop/playsInline/preload/
// poster/src) is identical on every render (asset() is a pure string
// concat), so React never touches the DOM node when usePrices ticks every
// 15s — playback is never reset by a price update.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { formatPrice, usePrices } from '../../lib/prices';

export default function Hero() {
  const { prices } = usePrices();
  const videoRef = useRef(null);
  const [posterOnly, setPosterOnly] = useState(false);
  // Ref mirror of posterOnly: the retry loop and the onCanPlay handler run
  // outside React's render cycle, so they read this instead of stale state.
  const posterOnlyRef = useRef(false);

  const showPoster = () => {
    if (videoRef.current) videoRef.current.pause();
    posterOnlyRef.current = true;
    setPosterOnly(true);
  };

  // Play if the browser lets us — used by onCanPlay. Sets muted
  // imperatively first (see the effect for why React's muted prop is not
  // enough on its own).
  const tryPlay = () => {
    const v = videoRef.current;
    if (!v || posterOnlyRef.current || !v.paused) return;
    v.muted = true;
    v.play().catch(() => {
      /* blocked for now — the retry loop tries again */
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React sets the `muted` ATTRIBUTE, but Chrome's autoplay policy checks
    // the muted PROPERTY — and the property is only initialised from the
    // attribute at element creation, before React sets it (long-standing
    // React gotcha). Set it imperatively the moment the element exists, so
    // the native autoplay evaluation sees a muted video.
    video.muted = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 760px)').matches;
    if (reduced || small) {
      video.pause();
      posterOnlyRef.current = true;
      setPosterOnly(true);
      return;
    }
    // Autoplay is native (attributes on the <video>), but some browsers
    // block the initial autoplay — the QA browser froze the hero on its
    // first frame even with a one-shot retry. Retry until it is actually
    // playing: immediately, then every 500ms for up to ~5s. The loop
    // clears itself the moment playback starts, and on unmount.
    let tries = 0;
    let timer = null;
    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };
    const tick = () => {
      const v = videoRef.current;
      if (!v || posterOnlyRef.current) {
        stop();
        return;
      }
      if (!v.paused) {
        stop();
        return;
      }
      tries += 1;
      if (tries > 10) {
        stop();
        return;
      }
      v.muted = true;
      v.play().catch(() => {
        /* retry on the next tick */
      });
    };
    tick();
    timer = setInterval(tick, 500);
    return stop;
    // Run once on mount — the video element is stable across re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          poster={asset('hero-poster.jpg')}
          src={asset('hero-market.mp4')}
          onCanPlay={tryPlay}
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
