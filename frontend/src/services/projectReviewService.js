import api from './api';

export const reviewProject = async (repositoryUrl) => (await api.post('/github/review', { repositoryUrl })).data;
export const getProjectReviews = async () => (await api.get('/github/reviews')).data;
export const getProjectReviewById = async (reviewId) => (await api.get(`/github/review/${reviewId}`)).data;
