import api from './api';

export const connectGithub = async (githubUsername) => (
  await api.post('/github/connect', { githubUsername })
).data;
