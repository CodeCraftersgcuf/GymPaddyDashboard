import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface CreateAdPayload {
  title: string;
  description: string;
  budget: number;
  start_date: string;
  end_date: string;
}

export interface UpdateAdPayload {
  title?: string;
  description?: string;
  budget?: number;
  start_date?: string;
  end_date?: string;
}

export const useCreateAd = (options?: UseMutationOptions<any, Error, CreateAdPayload>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateAdPayload) => apiCall.post(API_ROUTES.ADS.CREATE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
    ...options,
  });
};

export const useUpdateAd = (options?: UseMutationOptions<any, Error, { id: string; data: UpdateAdPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdPayload }) => 
      apiCall.put(API_ROUTES.ADS.UPDATE(id), data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ad', variables.id] });
    },
    ...options,
  });
};

export const useDeleteAd = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.ADS.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
    ...options,
  });
};

export const usePauseAd = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.post(API_ROUTES.ADS.PAUSE(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ad', id] });
    },
    ...options,
  });
};

export const useResumeAd = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.post(API_ROUTES.ADS.RESUME(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ad', id] });
    },
    ...options,
  });
};
