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
