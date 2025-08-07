import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../utils/api';
import { setAuth, clearAuth, getUser, isAuthenticated } from '../utils/auth';
import { LoginRequest, LoginResponse } from '../types';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const logout = () => {
    clearAuth();
    queryClient.clear();
    navigate('/login');
    toast.info('Logged out successfully');
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    currentUser: getUser(),
    isAuthenticated: isAuthenticated(),
  };
};