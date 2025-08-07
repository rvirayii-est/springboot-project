import { AuthUser } from '../types';

export const TOKEN_KEY = 'jwt_token';
export const USER_KEY = 'user';

export const setAuth = (token: string, user: AuthUser) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const getUser = (): AuthUser | null => {
  const userStr = sessionStorage.getItem(USER_KEY);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const clearAuth = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};