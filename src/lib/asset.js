// Public media lives in public/assets/ and is served under the site base:
// '/' in dev, '/nextrade-prime-broker/' in the production build.
// Usage: <img src={asset('hero-trader.jpg')} … /> — never a bare 'assets/…'
// path, which breaks on nested routes.
export const asset = (p) => import.meta.env.BASE_URL + 'assets/' + p;
