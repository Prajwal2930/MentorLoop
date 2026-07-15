import api from './api';

export const getSkills = async () => (await api.get('/skills')).data;
export const createSkill = async (skillData) => (await api.post('/skills', skillData)).data;
export const updateSkill = async (skillId, skillData) => (await api.put(`/skills/${skillId}`, skillData)).data;
export const deleteSkill = async (skillId) => (await api.delete(`/skills/${skillId}`)).data;
