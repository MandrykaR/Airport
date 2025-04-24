import axios from 'axios';

import { useAuthToken } from '../../hooks/useAuthToken';

const API_URL = 'http://localhost:3005';

export const useGetUsers = () => {
  const token = useAuthToken();

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        'There was an error when sending the link'
      );
    }
  };

  return { getUsers };
};

export const useCreateUser = () => {
  const token = useAuthToken();

  const createUser = async ({ name, email, password, isAdmin }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/create`,
        {
          fullName: name,
          email,
          password,
          isAdmin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  return { createUser };
};

export const useDeleteUser = () => {
  const token = useAuthToken();

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        'There was an error when sending the link'
      );
    }
  };

  return { deleteUser };
};

export const useDeleteMyAccount = () => {
  const token = useAuthToken();

  const deleteMyAccount = async () => {
    try {
      const response = await axios.delete(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error';
    }
  };

  return { deleteMyAccount };
};

export const useEditUser = () => {
  const token = useAuthToken();

  const editUser = async (updateData) => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/update`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        'There was an error when sending the link'
      );
    }
  };

  return { editUser };
};

export const useGetMyInfo = () => {
  const token = useAuthToken();

  const getMyInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error';
    }
  };

  return { getMyInfo };
};

export const useUpdateInfoProfile = () => {
  const token = useAuthToken();

  const getUpdateInfo = async (payload) => {
    try {
      const response = await axios.patch(
        `${API_URL}/user/change-profile`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error';
    }
  };

  return { getUpdateInfo };
};
