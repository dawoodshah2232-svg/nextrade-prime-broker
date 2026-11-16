// Public media lives in public/assets/ and is served under the site base:
// '/' - the site is served from the domain root (https://nextradeprime.com/).
// Usage: <img src={asset('help-centre.jpg')} … /> - never a bare 'assets/…'
// path, which breaks on nested routes.
export const asset = (p) => import.meta.env.BASE_URL + "assets/" + p;
