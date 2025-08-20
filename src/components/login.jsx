import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import '../AppLogin.css';
import logo from '../assets/smartvendor-logo.svg';
import { apiCall, buildApiUrl } from '../utills/helpers';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      const {emailId, token} = await apiCall(buildApiUrl('auth/login'), 'POST', { email, password });
      if (token) {
        localStorage.setItem('authToken', token);
        dispatch(login(emailId));
        navigate('/');
      } else {
        setError(message || 'Invalid credentials');
      }
    } catch (err) {
        console.error('Login failed:', err);
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <img src={logo} alt="SmartVendor Logo" className="login-logo" />
      <div className="login-title">Login</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <div className="login-error">{error}</div>}
    </div>
  );
};

export default Login;
