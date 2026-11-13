// Signup - converted from signup.html (~/workspace/nextrade-old-html/).
// The old page had NO page hero: the split auth layout IS the page, so the
// placeholder's PageHero is dropped. The overlay heading "Start trading
// today." lives in the auth visual, as in the old page.
// Submit via signup() from ../lib/auth (name + valid email + 6+ char
// password, as before); on success navigate to /dashboard, on failure show
// the returned error inline (the old site used alert()).
// The "First account" select is carried over verbatim; the old handler did
// not store its value, and signup() takes no account argument, so it stays
// a display-only field, as before.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../lib/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = signup(name, email, password);
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
          src="https://images.unsplash.com/photo-1579226905180-636b76d96082?w=1200&q=80&auto=format&fit=crop"
          alt="Trader at a round table with two laptops showing trading charts"
        />
        <div className="overlay">
          <h2>Start trading today.</h2>
          <p>Register in two minutes, verify, deposit from $100 - and trade on MT5.</p>
        </div>
      </div>
      <div className="auth-form">
        <div className="form-card">
          <h2 style={{ marginBottom: 6 }}>Create an account</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
            Free to open. No deposit needed to register.
          </p>
          <div className="demo-note">
            Demo only - no real account is created. Use any name, email and a password of 6+
            characters.
          </div>
          {error && (
            <div role="alert" style={{ color: 'var(--red)', marginBottom: 16, fontSize: '.92rem' }}>
              {error}
            </div>
          )}
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="su-name">Full name</label>
              <input
                id="su-name"
                required
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="su-email">Email</label>
              <input
                id="su-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="su-password">Password</label>
              <input
                id="su-password"
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="su-account">First account</label>
              <select id="su-account">
                <option>Standard</option>
                <option>ECN</option>
                <option>PRO</option>
                <option>VIP</option>
                <option>Islamic (swap-free)</option>
                <option>Demo - $10,000 virtual</option>
              </select>
            </div>
            <button className="btn btn-gold" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Create Account
            </button>
          </form>
          <p className="form-note">
            By creating an account you agree to the terms on the{' '}
            <Link to="/regulation" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Regulation
            </Link>{' '}
            page. CFDs are leveraged products - capital at risk.
          </p>
          <p className="form-note">
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 700, color: 'var(--ink)' }}>
              Log in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
