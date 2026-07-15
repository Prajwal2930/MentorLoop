import api from './api';

export const analyzeCode = async ({ language, code }) => (await api.post('/ai/analyze-code', { language, code })).data;
export const getAnalysisHistory = async () => (await api.get('/analysis/history')).data;
export const getAnalysisById = async (analysisId) => (await api.get(`/analysis/${analysisId}`)).data;
