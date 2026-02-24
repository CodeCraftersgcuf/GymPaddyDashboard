import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export const useHidePost = (options?: UseMutationOptions<any, Error, string | number>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => apiCall.post(API_ROUTES.SOCIAL.HIDE_POST(String(id))),
    onSuccess: (response: any, postId) => {
      // The response from apiCall is already the unwrapped `data` object: { is_hidden: boolean }
      const newHiddenState = response?.is_hidden ?? response?.data?.is_hidden;

      // Optimistically update every cached posts list (all queries starting with ['social', 'posts'])
      queryClient.setQueriesData({ queryKey: ['social', 'posts'] }, (old: any) => {
        if (!old) return old;
        // Handle both plain arrays and mapped post arrays
        if (Array.isArray(old)) {
          return old.map((post: any) =>
            String(post.id) === String(postId)
              ? { ...post, isHidden: newHiddenState, is_hidden: newHiddenState }
              : post
          );
        }
        return old;
      });

      // Refetch to get fresh server state
      queryClient.invalidateQueries({ queryKey: ['social', 'posts'] });
    },
    ...options,
  });
};

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

export const useDeleteLiveStream = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.SOCIAL.DELETE_LIVE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social', 'live'] });
    },
    ...options,
  });
};
