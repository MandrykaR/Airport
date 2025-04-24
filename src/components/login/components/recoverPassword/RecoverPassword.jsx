import { IconButton, Snackbar, TextField } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recoverPassword } from '../../../../entities/authGateways';

import './recoverPassword.scss';

const RecoverPassword = ({ resetKey }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setOpen(true);
      setMessage("The passwords don't match");
      return;
    }

    if (!resetKey) {
      setOpen(true);
      setMessage('The key is missing. Please request a new link');
      return;
    }

    try {
      const response = await recoverPassword(resetKey, newPassword);

      setOpen(true);
      setMessage('Password changed');
      setTimeout(() => navigate('/login'), 1000);

      return response;
    } catch (err) {
      setOpen(true);
      setMessage(err);
    }
  };

  return (
    <div className="recover-container">
      <form onSubmit={handleRecoverPassword}>
        <div>
          <label>Reset Password</label>
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="confirm-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button className="btn-signIn" type="submit">
          Submit
        </button>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={message}
          action={action}
        />
      </form>
    </div>
  );
};

export default RecoverPassword;
