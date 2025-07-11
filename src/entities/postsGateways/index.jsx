import axios from 'axios';
import { useAuthToken } from '../../hooks/useAuthToken';
export const API_URL = 'http://localhost:3005/';

export const getPostsById = () => {
  const token = useAuthToken();

  const getPostById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error in receiving the post', error);
    }
  };

  return { getPostById };
};

export const useGetPosts = () => {
  const token = useAuthToken();

  const getPosts = async (updateData) => {
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: updateData,
      });

      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        'There was an error when sending the link'
      );
    }
  };

  return { getPosts };
};

export const useCreatePost = () => {
  const token = useAuthToken();

  const createPost = async ({ title, content }) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw (
        error.response?.data?.message ||
        'There was an error when sending the post'
      );
    }
  };

  return { createPost };
};

export const useDeletePost = () => {
  const token = useAuthToken();

  const deletePosts = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw (
        error.response?.data?.message ||
        'There was an error when delete the post'
      );
    }
  };

  return { deletePosts };
};

export const useUpdatePost = () => {
  const token = useAuthToken();

  const updatePost = async (id, updateData) => {
    try {
      const response = await axios.put(`${API_URL}posts/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw (
        error.response?.data?.message ||
        'There was an error when sending the post'
      );
    }
  };

  return { updatePost };
};
