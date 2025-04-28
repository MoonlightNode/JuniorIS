import React, { useState, useEffect } from 'react';
import { useNavigate }                 from 'react-router-dom';
import { useAuth }                     from '../context/AuthContext';
import './SignIn.css';

export default function SignIn() {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // pull in the new signIn, plus authentication flags
  const { signIn, isAuthenticated, needsProfile } = useAuth();
  const navigate = useNavigate();

  // when auth state changes, redirect accordingly
  useEffect(() => {
    if (!isAuthenticated) return;

    if (needsProfile) {
      navigate('/first-time', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, needsProfile, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // pass rememberMe flag to context
    signIn(email, rememberMe);
    // no direct navigate here—useEffect will handle it
  };

  return (
    <div className="signin-page">
      <form onSubmit={handleSubmit} className="signin-card">
        <h2>Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div className="remember-me">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
    </div>
  );
}
