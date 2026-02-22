import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface SendNotificationPayload {
  title: string;
  message: string;
  type?: string;
  targetUsers?: string[];
}

export interface SendBulkNotificationPayload {
  title: string;
  message: string;
  type?: string;
  userType: 'all' | 'subscribers' | 'active';
}

export const useSendNotification = (options?: UseMutationOptions<any, Error, SendNotificationPayload>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendNotificationPayload) =>
      apiCall.post(API_ROUTES.NOTIFICATIONS.SEND, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['broadcast-history'] });
    },
    ...options,
  });
};

export const useSendBulkNotification = (options?: UseMutationOptions<any, Error, SendBulkNotificationPayload>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendBulkNotificationPayload) =>
      apiCall.post(API_ROUTES.NOTIFICATIONS.SEND_BULK, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['broadcast-history'] });
    },
    ...options,
  });
};

export const useMarkNotificationRead = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiCall.post(API_ROUTES.NOTIFICATIONS.MARK_AS_READ(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    ...options,
  });
};

export const useUpdateNotificationStatus = (options?: UseMutationOptions<any, Error, { id: string; status: string }>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiCall.put(API_ROUTES.NOTIFICATIONS.UPDATE_STATUS(id), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    ...options,
  });
};

export const useDeleteNotification = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiCall.delete(API_ROUTES.NOTIFICATIONS.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['broadcast-history'] });
    },
    ...options,
  });
};
