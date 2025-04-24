import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
} from '@mui/material';
import {
  useDeleteMyAccount,
  useGetMyInfo,
  useUpdateInfoProfile,
} from '../../../../entities/usersGateways';

import './profileUser.scss';

export default function Profile() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { getMyInfo } = useGetMyInfo();
  const { getUpdateInfo } = useUpdateInfoProfile();
  const { deleteMyAccount } = useDeleteMyAccount();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        const user = response.data;

        setUser(user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        ...(oldPassword && { oldPassword }),
        ...(password && { newPassword: password }),
        ...(confirmPassword && { confirmPassword }),
        ...(email && { newEmail: email }),
        ...(fullName && { newFullName: fullName }),
      };

      await getUpdateInfo(payload);

      setUser((prev) => ({
        ...prev,
        fullName: payload.newFullName || prev.fullName,
        email: payload.newEmail || prev.email,
      }));

      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setOldPassword('');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account?'
    );
    if (!confirmed) return;
    localStorage.removeItem('token');
    window.location.href = '/login';
    try {
      await deleteMyAccount();
    } catch (error) {
      console.error('Delete failed:', error);
    }

    return;
  };

  return (
    <Box className="profile-container">
      <Paper elevation={3} className="profile-paper">
        <Box className="profile-data">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Personal Info
          </Typography>

          <Box className="profile-data-row">
            <Box className="profile-data-item">
              <Typography variant="caption" className="profile-data-label">
                Name
              </Typography>
              <Typography variant="body1">{user.fullName}</Typography>
            </Box>

            <Box className="profile-data-item">
              <Typography variant="caption" className="profile-data-label">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>

            <Box className="profile-data-item">
              <Typography variant="caption" className="profile-data-label">
                Status
              </Typography>
              <Typography variant="body1">
                {user.isAdmin ? 'Admin' : 'Redactor'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="profile-form">
          <Typography
            variant="h4"
            className="profile-title"
            sx={{ fontWeight: 600 }}
          >
            Change Data
          </Typography>

          <Box className="profile-row">
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Box>

          <Box className="profile-row">
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </Box>

          <Box className="profile-row">
            <TextField
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              fullWidth
            />
          </Box>
        </Box>

        <Divider className="profile-divider" />

        <Box className="profile-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            className="profile-btn"
          >
            Save Changes
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAccount}
            fullWidth
            className="profile-btn"
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
