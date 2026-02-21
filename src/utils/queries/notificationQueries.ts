import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface Notification {
  id: string;
  user_id?: number;
  title?: string;
  message: string;
  type?: string;
  status?: string;
  created_at: string;
  time?: string;
}

export const useGetAllNotifications = (options?: UseQueryOptions<Notification[]>) => {
  return useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiCall.get<{ notifications: Notification[] } | Notification[]>(API_ROUTES.NOTIFICATIONS.GET_ALL);
      if (Array.isArray(response)) return response;
      return Array.isArray(response.notifications) ? response.notifications : [];
    },
    ...options,
  });
};

export const useGetNotificationById = (id: string, options?: UseQueryOptions<Notification>) => {
  return useQuery<Notification>({
    queryKey: ['notification', id],
    queryFn: () => apiCall.get<Notification>(API_ROUTES.NOTIFICATIONS.GET_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};

export const useGetBroadcastHistory = (options?: UseQueryOptions<Notification[]>) => {
  return useQuery<Notification[]>({
    queryKey: ['broadcast-history'],
    queryFn: async () => {
      const response = await apiCall.get<{ notifications: Notification[] } | Notification[]>(
        API_ROUTES.NOTIFICATIONS.GET_BROADCAST_HISTORY
      );
      if (Array.isArray(response)) return response;
      return Array.isArray((response as any).notifications) ? (response as any).notifications : [];
    },
    ...options,
  });
};
