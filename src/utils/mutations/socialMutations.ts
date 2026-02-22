import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export const useHidePost = (options?: UseMutationOptions<any, Error, string | number>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => apiCall.post(API_ROUTES.SOCIAL.HIDE_POST(String(id))),
    onSuccess: (response: any, postId) => {
      const newHiddenState = response?.is_hidden ?? response?.data?.is_hidden;

      const updatePostsCache = (old: any[] | undefined) => {
        if (!old) return old;
        return old.map((post: any) =>
          String(post.id) === String(postId)
            ? { ...post, isHidden: newHiddenState, is_hidden: newHiddenState }
            : post
        );
      };

      queryClient.setQueriesData({ queryKey: ['social', 'posts'] }, updatePostsCache);
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
