// Count-up number — ported from the old script.js (lines ~83-102):
// starts when scrolled into view (IntersectionObserver, threshold 0.4),
// 1400ms cubic ease-out (1-(1-p)^3), integers get toLocaleString grouping.
// Props: end (number), decimals (0), prefix (''), suffix (''), duration (1400).
// Usage (homepage stats band): <b><CountUp end={1000} suffix="+" /></b>
import { useEffect, useRef, useState } from 'react';

export default function CountUp({ end, decimals = 0, prefix = '', suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  // Matches the old markup's pre-animation text: plain 0 / 0.0, no affixes.
  const [text, setText] = useState(decimals ? (0).toFixed(decimals) : '0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(el);
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const v = end * (1 - Math.pow(1 - p, 3));
            setText(
              prefix + (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()) + suffix,
            );
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, decimals, prefix, suffix, duration]);

  return <span ref={ref}>{text}</span>;
}
