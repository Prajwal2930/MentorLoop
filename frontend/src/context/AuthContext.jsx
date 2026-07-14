import { createContext, useEffect, useMemo, useState } from 'react';

import { getCurrentUser, loginUser, registerUser } from '../services/authService';

const TOKEN_KEY = 'mentorloop_token';
const USER_KEY = 'mentorloop_user';

export const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(getStoredUser);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const saveSession = (authData) => {
    localStorage.setItem(TOKEN_KEY, authData.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  };

  // Validate persisted sessions so expired or revoked tokens are not reused.
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { user: currentUser } = await getCurrentUser();
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
        setUser(currentUser);
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const register = async (userData) => {
    try {
      const authData = await registerUser(userData);
      saveSession(authData);
      return authData.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Unable to create your account.');
    }
  };

  const login = async (credentials) => {
    try {
      const authData = await loginUser(credentials);
      saveSession(authData);
      return authData.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Unable to sign in. Please try again.');
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token && user),
      register,
      login,
      logout: clearSession,
    }),
    [token, user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
