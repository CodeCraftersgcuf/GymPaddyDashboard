import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface CreateUserPayload {
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  age: number;
  password: string;
  profile_picture?: File | null;
}

export interface UpdateUserPayload {
  fullName?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  age?: number;
}

export interface BanUserPayload {
  reason: string;
  duration?: number;
}

export const useCreateUser = (options?: UseMutationOptions<any, Error, CreateUserPayload>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateUserPayload) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      return apiCall.post(API_ROUTES.USERS.CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    ...options,
  });
};

export const useUpdateUser = (options?: UseMutationOptions<any, Error, { id: string; data: UpdateUserPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserPayload }) => 
      apiCall.put(API_ROUTES.USERS.UPDATE(id), data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    },
    ...options,
  });
};

export const useDeleteUser = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.USERS.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    ...options,
  });
};

export const useBanUser = (options?: UseMutationOptions<any, Error, { id: string; data: BanUserPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BanUserPayload }) => 
      apiCall.post(API_ROUTES.USERS.BAN(id), data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    },
    ...options,
  });
};

export const useUnbanUser = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.post(API_ROUTES.USERS.UNBAN(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
    ...options,
  });
};
