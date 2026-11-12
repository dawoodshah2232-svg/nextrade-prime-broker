// Scroll reveal — ported from the old assets/script.js (lines ~73-82).
// Adds .reveal to sections/cards/images (so the whole site animates, as the
// old script did on DOMContentLoaded), then observes every .reveal element
// and adds .visible when it scrolls into view (threshold 0.12, once).
// Layout calls useReveal(pathname) so it re-runs after every navigation.
import { useEffect } from 'react';

export function useReveal(dep) {
  useEffect(() => {
    document
      .querySelectorAll('section:not(.hero), .card, .split-img, .footer-grid > div')
      .forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((el) => {
      // Already scrolled past before this observer existed: the SPA renders
      // only after the JS bundle executes, so a fast scroll can pass a
      // section before it is observed — it would then sit invisible
      // (opacity 0), reading as a large empty dark band, until scrolled
      // back up to. Reveal it now; it can never intersect again on the way
      // down. Everything else is observed normally.
      if (el.getBoundingClientRect().bottom <= 0) {
        el.classList.add('visible');
      } else {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [dep]);
}

export default useReveal;
