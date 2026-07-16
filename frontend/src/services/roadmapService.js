import api from './api';

export const generateRoadmap = async () => (await api.post('/roadmap/generate')).data;
export const getCurrentRoadmap = async () => (await api.get('/roadmap')).data;
export const getRoadmapById = async (roadmapId) => (await api.get(`/roadmap/${roadmapId}`)).data;
export const updateRoadmapWeek = async (weekId, completed) => (await api.patch(`/roadmap/week/${weekId}`, { completed })).data;
