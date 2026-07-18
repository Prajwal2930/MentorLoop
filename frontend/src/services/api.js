import axios from 'axios';

let activeRequestCount = 0;
const requestStateListeners = new Set();

const notifyRequestState = () => {
  requestStateListeners.forEach((listener) => listener(activeRequestCount));
};

const beginRequest = () => {
  activeRequestCount += 1;
  notifyRequestState();
};

const endRequest = () => {
  activeRequestCount = Math.max(0, activeRequestCount - 1);
  notifyRequestState();
};

export const subscribeToRequestState = (listener) => {
  requestStateListeners.add(listener);
  listener(activeRequestCount);

  return () => requestStateListeners.delete(listener);
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the persisted token only when a request needs authenticated access.
api.interceptors.request.use((config) => {
  beginRequest();
  const token = localStorage.getItem('mentorloop_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  endRequest();
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    endRequest();
    return response;
  },
  (error) => {
    endRequest();
    return Promise.reject(error);
  },
);

export default api;
