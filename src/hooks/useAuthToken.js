import { useSelector } from 'react-redux';

export const useAuthToken = () => {
  return useSelector((state) => state.auth.token);
};
