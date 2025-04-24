import axios from 'axios';

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RecoverPassword from '../recoverPassword/RecoverPassword';
import { resetLinkEmail } from '../../../../entities/authGateways';

import './resetLinkEmail.scss';

const ResetLinkEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const resetKey = searchParams.get('key');
  const navigate = useNavigate();

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      const data = await resetLinkEmail(email);
      setMessage(data.message);
      setError('');
      return data;
    } catch (err) {
      setError(err);
    }
  };

  return resetKey ? (
    <RecoverPassword resetKey={resetKey} />
  ) : (
    <div className="forgot-container">
      <form onSubmit={handleEmail}>
        <div>
          <Typography align="center">
            Enter your account's email address, and we'll send you a link to
            reset your password.
          </Typography>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            fullWidth
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#1976d2',
              mt: 2,
              borderRadius: 5,
              textTransform: 'none',
            }}
          >
            Send Reset Link
          </Button>
        </div>
      </form>
      <Typography align="center" sx={{ mt: 2 }}>
        <Button onClick={() => navigate('/login')} sx={{ color: '#1976d2' }}>
          Back to Login
        </Button>
      </Typography>
    </div>
  );
};

export default ResetLinkEmail;
