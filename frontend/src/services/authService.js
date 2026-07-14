import api from './api';

/** Create a new MentorLoop account. */
export const registerUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

/** Authenticate a user and receive their JWT and profile. */
export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

/** Fetch the profile associated with the current JWT. */
export const getCurrentUser = async () => {
  const { data } = await api.get('/user/me');
  return data;
};
