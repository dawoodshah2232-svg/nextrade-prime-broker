// Reusable FAQ accordion — same markup and behaviour as the old site:
// each item toggles its own .open class independently (multiple items may
// be open at once; the old script.js just toggled the clicked item).
// items: [{ q, a }] — q is plain text; a may be a string of HTML copied
// verbatim from the old page (rendered as-is) or a React node (use JSX
// with <Link> for any links inside the answer).
import { useState } from 'react';

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  return (
    <>
      {items.map((item, i) => (
        <div key={i} className={'faq-item reveal' + (open.has(i) ? ' open' : '')}>
          <button className="faq-q" type="button" onClick={() => toggle(i)}>
            {item.q} <span className="plus">+</span>
          </button>
          {typeof item.a === 'string' ? (
            <div className="faq-a" dangerouslySetInnerHTML={{ __html: item.a }} />
          ) : (
            <div className="faq-a">{item.a}</div>
          )}
        </div>
      ))}
    </>
  );
}
