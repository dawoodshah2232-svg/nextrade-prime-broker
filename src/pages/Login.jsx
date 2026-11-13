// Login - converted from login.html (~/workspace/nextrade-old-html/).
// The old page had NO page hero: the split auth layout IS the page, so the
// placeholder's PageHero is dropped. The overlay heading "Welcome back,
// trader." lives in the auth visual, as in the old page.
// Submit via login() from ../lib/auth - it accepts ONLY the demo account
// demo@nextradeprime.com / demo1234 and returns { ok, user } or { ok, error };
// on success navigate to /dashboard, on failure show the returned error
// inline (the old site used alert()).
// WORDING UPDATE (per spec): the old demo note said "use any email" - that
// is no longer true, so the note now names the demo account. Still labelled
// DEMO, same tone as before.
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isLoggedIn, login } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Already signed in (a session exists in localStorage) - the login form
  // is pointless; go straight to the client area.
  if (isLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.ok) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80&auto=format&fit=crop"
          alt="MetaTrader 5 terminal on a laptop and phone with live charts"
        />
        <div className="overlay">
          <h2>Welcome back, trader.</h2>
          <p>Your accounts, deposits and MT5 logins are all in one place.</p>
        </div>
      </div>
      <div className="auth-form">
        <div className="form-card">
          <h2 style={{ marginBottom: 6 }}>Log in</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Access your client area.</p>
          <div className="demo-note">
            Demo only - log in with the demo account: <b>demo@nextradeprime.com / demo1234</b>.
          </div>
          {error && (
            <div role="alert" style={{ color: 'var(--red)', marginBottom: 16, fontSize: '.92rem' }}>
              {error}
            </div>
          )}
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                required
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-gold" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Log In
            </button>
          </form>
          <p className="form-note">
            Forgot your password?{' '}
            <Link to="/contact" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Reset it via support
            </Link>
            .
          </p>
          <p className="form-note">
            New to NexTrade Prime?{' '}
            <Link to="/signup" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Create an account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
