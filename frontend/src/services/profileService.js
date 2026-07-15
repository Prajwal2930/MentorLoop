import api from './api';

export const getProfile = async () => {
  const { data } = await api.get('/profile');
  return data;
};

export const updateProfile = async (profileData) => {
  const { data } = await api.put('/profile', profileData);
  return data;
};

export const completeProfile = async () => {
  const { data } = await api.patch('/profile/complete');
  return data;
};
