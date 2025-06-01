import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import { setToken } from '../../redux/authSlice';
import { loginUser } from '../../entities/authGateways';

import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      dispatch(setToken(res.data.token));
      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success',
      });
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      const message = err.response?.data?.message || 'There was a login error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default Login;
