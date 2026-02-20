import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface CreateGymPayload {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
}

export interface UpdateGymPayload {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  status?: string;
}

export const useCreateGym = (options?: UseMutationOptions<any, Error, CreateGymPayload>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateGymPayload) => apiCall.post(API_ROUTES.GYM.CREATE_GYM, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
    },
    ...options,
  });
};

export const useUpdateGym = (options?: UseMutationOptions<any, Error, { id: string; data: UpdateGymPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGymPayload }) => 
      apiCall.put(API_ROUTES.GYM.UPDATE_GYM(id), data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
      queryClient.invalidateQueries({ queryKey: ['gym', variables.id] });
    },
    ...options,
  });
};

export const useDeleteGym = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.GYM.DELETE_GYM(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
    },
    ...options,
  });
};
