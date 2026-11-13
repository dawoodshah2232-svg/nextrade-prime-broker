// The standard inner-page hero, verbatim from the old static pages:
// <section class="page-hero"><div class="container">
//   <p class="breadcrumb">…</p><h1>…</h1><p>…intro…</p>
// </div></section>
// crumbs: [{ label, to? }] - Home always links to '/'; the last crumb is
// plain text. Omit crumbs on pages that had no breadcrumb (home, auth,
// dashboard). title and intro may be strings or JSX (the home h1 has a
// gold <span>; some intros contain a Contact link).
import { Link } from 'react-router-dom';

export default function PageHero({ crumbs, title, intro }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs && crumbs.length > 0 && (
          <p className="breadcrumb">
            {crumbs.map((c, i) => (
              <span key={i}>
                {i > 0 && (
                  <>
                    &nbsp;/&nbsp;{' '}
                  </>
                )}
                {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
              </span>
            ))}
          </p>
        )}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
