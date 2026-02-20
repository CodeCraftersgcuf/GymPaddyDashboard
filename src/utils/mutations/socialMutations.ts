import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export const useDeletePost = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.SOCIAL.DELETE_POST(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social', 'posts'] });
    },
    ...options,
  });
};

export const useDeleteStatus = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.SOCIAL.DELETE_STATUS(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social', 'statuses'] });
    },
    ...options,
  });
};

export const useEndLiveStream = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.post(API_ROUTES.SOCIAL.END_LIVE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social', 'live'] });
    },
    ...options,
  });
};
