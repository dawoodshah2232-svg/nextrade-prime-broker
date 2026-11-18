// Site-wide scroll animations (AOS). After every navigation this tags the
// new page's content with AOS attributes, then Layout calls
// AOS.refreshHard() so the library picks them up:
//   - headings / eyebrows / intro copy        -> fade-up
//   - children of card grids, steps, lists    -> fade-up / zoom-in-up,
//     staggered left-to-right (delay by column)
//   - photos and media                        -> zoom-in
//   - tables                                  -> fade-up
//   - CTA bands                               -> zoom-in
// Elements that already carry data-aos (hand-tuned pages such as
// /partners) are left alone. The legacy ".reveal" class, still present in
// many page components, is converted to data-aos="fade-up" so there is a
// single animation system.
// Anything already scrolled past when the page mounts is not animated
// (it would otherwise sit invisible until scrolled back to).
import { useEffect } from "react";

const RULES = [
  // [selector, animation, stagger?]
  [".grid2 > *, .grid3 > *, .grid4 > *, .promo-grid > *, .acct-grid > *, .pillars-grid > *, .stats-grid > *", "fade-up", true],
  [".steps > *, .withdraw-steps > li, .ib-steps > li", "fade-up", true],
  [".tab-panel, .faq-list, .faq-item", "fade-up", false],
  [".table-wrap, .pay-table, .spreads-wrap", "fade-up", false],
  [".split-img, .fund-photo, .mt5-shot, .video-card", "zoom-in", false],
  [".cta-band", "zoom-in", false],
  [
    "main section:not(.hero):not(.page-hero) .container > h2, main section:not(.hero):not(.page-hero) .container > .eyebrow, main section:not(.hero):not(.page-hero) .container > .sub, main section:not(.hero):not(.page-hero) .container > p",
    "fade-up",
    false,
  ],
  [".footer-grid > div", "fade-up", true],
];

export function useReveal(dep) {
  useEffect(() => {
    const vh = window.innerHeight;
    const tag = (el, anim, delay) => {
      if (el.hasAttribute("data-aos")) return;
      if (el.closest("[data-aos-page]") && !el.closest(".site-footer")) return;
      // Nested inside, or wrapping, something that already animates:
      // don't double up.
      if (el.parentElement && el.parentElement.closest("[data-aos]")) return;
      if (el.querySelector("[data-aos]")) return;
      if (el.getBoundingClientRect().bottom < 0) return;
      el.setAttribute("data-aos", anim);
      if (delay) el.setAttribute("data-aos-delay", String(delay));
      // Above-the-fold content starts sooner so the page never looks empty.
      if (el.getBoundingClientRect().top < vh) el.setAttribute("data-aos-offset", "0");
    };

    RULES.forEach(([sel, anim, stagger]) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.closest(".hero")) return;
        let delay = 0;
        if (stagger && el.parentElement) {
          const i = Array.prototype.indexOf.call(el.parentElement.children, el);
          delay = (i % 4) * 90;
        }
        tag(el, anim, delay);
      });
    });

    // Legacy .reveal markup -> AOS (after the rules, so grid children keep
    // their stagger and a .reveal wrapper around them is skipped).
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("reveal");
      if (!el.closest(".hero")) tag(el, "fade-up", 0);
    });
  }, [dep]);
}

export default useReveal;
