import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { setToken } from '../../redux/authSlice';
import { loginUser } from '../../entities/authGateways';

import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      dispatch(setToken(res.data.token));
      navigate('/admin');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('There was a login error');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-signIn" type="submit">
          Sign In
        </button>

        <Link
          onClick={() => navigate('/auth/reset-password')}
          component="button"
          type="button"
          sx={{ alignSelf: 'center' }}
        >
          Forgot your password?
        </Link>
      </form>
    </div>
  );
};

export default Login;
