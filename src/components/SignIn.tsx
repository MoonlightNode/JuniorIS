import './SignIn.css';
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';


const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Store the user data in localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    // Navigate to the profile page
    navigate('/profile');
  };

  return (
    <div className="sign-in-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
