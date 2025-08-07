import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiClient } from '../utils/api';
import { Role, Permission, CreateRoleRequest, UpdateRoleRequest, ApiResponse, PaginatedResponse } from '../types';

export const useRoles = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ['roles', page, size],
    queryFn: async (): Promise<PaginatedResponse<Role>> => {
      const response = await apiClient.get(`/roles?page=${page}&size=${size}`);
      return response.data;
    },
  });
};

export const useAllRoles = () => {
  return useQuery({
    queryKey: ['roles', 'all'],
    queryFn: async (): Promise<Role[]> => {
      const response = await apiClient.get('/roles/all');
      return response.data;
    },
  });
};

export const useRole = (id: number) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: async (): Promise<Role> => {
      const response = await apiClient.get(`/roles/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const usePermissions = () => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: async (): Promise<Permission[]> => {
      const response = await apiClient.get('/permissions');
      return response.data;
    },
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleData: CreateRoleRequest): Promise<ApiResponse<Role>> => {
      const response = await apiClient.post('/roles', roleData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role created successfully!');
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateRoleRequest }): Promise<ApiResponse<Role>> => {
      const response = await apiClient.put(`/roles/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role'] });
      toast.success('Role updated successfully!');
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<ApiResponse<null>> => {
      const response = await apiClient.delete(`/roles/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role deleted successfully!');
    },
  });
};