// Catch-all route. Old .html bookmarks (e.g. /accounts.html, /markets/forex.html)
// are stripped to the extensionless route; /index.html goes home. Anything
// else gets a plain "Page not found" in site styling with a Home link.
import { Link, Navigate, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function NotFound() {
  const { pathname } = useLocation();
  if (pathname.endsWith('.html')) {
    const stripped = pathname.replace(/\.html$/, '');
    if (stripped === '/index') return <Navigate to="/" replace />;
    return <Navigate to={stripped || '/'} replace />;
  }
  return (
    <>
      <PageHero
        title="Page not found"
        intro="The page you're looking for doesn't exist or has moved."
      />
      <section className="section">
        <div className="container">
          <Link className="btn btn-gold" to="/">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
