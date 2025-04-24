import axios from 'axios';

export const API_URL = 'http://localhost:3005/auth';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'There was a login error';
  }
};

export const resetLinkEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send_reset_link`, { email });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      'There was an error when sending the link'
    );
  }
};

export const recoverPassword = async (resetKey, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/recover_password`, {
      key: resetKey,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      'An error occurred while resetting the password'
    );
  }
};
