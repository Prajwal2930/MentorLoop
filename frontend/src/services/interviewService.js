import api from './api';

export const startInterview = async (interviewType) => (await api.post('/interview/start', { interviewType })).data;
export const evaluateInterview = async (sessionId, answers) => (await api.post('/interview/evaluate', { sessionId, answers })).data;
export const getInterviewHistory = async () => (await api.get('/interview/history')).data;
export const getInterviewById = async (interviewId) => (await api.get(`/interview/${interviewId}`)).data;
