import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface CreateAdminPayload {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateAdminPayload {
  fullName?: string;
  email?: string;
  password?: string;
}

export const useCreateAdmin = (options?: UseMutationOptions<any, Error, CreateAdminPayload>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAdminPayload) =>
      apiCall.post(API_ROUTES.ADMIN.CREATE, { ...data, username: data.email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    ...options,
  });
};

export const useUpdateAdmin = (options?: UseMutationOptions<any, Error, { id: string; data: UpdateAdminPayload }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminPayload }) =>
      apiCall.put(API_ROUTES.ADMIN.UPDATE(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    ...options,
  });
};

export const useDeleteAdmin = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.ADMIN.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    ...options,
  });
};
