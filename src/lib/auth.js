// DEMO auth only — localStorage, no backend. Ported from the old
// assets/script.js login/signup handlers (same localStorage key 'ntp_user',
// same stored shape { email, name }).
// CRM integration point: replace login()/signup() with a POST to the CRM
// endpoint before any production use.
//
// NOTE: the old static site accepted ANY email + 6+ character password.
// The React conversion narrows login() to the single published demo account
// below (per the conversion spec and README). Signup still accepts any
// name/email/password, as before.

export const DEMO_EMAIL = 'demo@nextradeprime.com';
export const DEMO_PASSWORD = 'demo1234';

const KEY = 'ntp_user';

function store(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

// Returns { ok: true, user } or { ok: false, error }. The caller shows the
// error (the old site used alert()).
export function login(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (cleanEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return {
      ok: false,
      error: 'Invalid demo credentials. Use demo@nextradeprime.com / demo1234.',
    };
  }
  const user = { email: DEMO_EMAIL, name: DEMO_EMAIL.split('@')[0] };
  return { ok: true, user: store(user) };
}

export function signup(name, email, password) {
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim();
  if (!cleanName || !cleanEmail.includes('@') || (password || '').length < 6) {
    return {
      ok: false,
      error: 'Fill in your name, a valid email and a password of at least 6 characters.',
    };
  }
  const user = { email: cleanEmail, name: cleanName };
  return { ok: true, user: store(user) };
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return getUser() !== null;
}

export function logout() {
  localStorage.removeItem(KEY);
}
