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
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

export default useReveal;
