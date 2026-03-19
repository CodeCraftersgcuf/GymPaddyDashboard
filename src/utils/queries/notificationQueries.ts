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
  user?: {
    id: number | null;
    username: string;
    profile_picture: string | null;
  };
}

export const useGetAllNotifications = (options?: UseQueryOptions<Notification[]>) => {
  return useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const allNotifications: Notification[] = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await apiCall.get<
          { notifications?: Notification[]; pagination?: { totalPages?: number } } | Notification[]
        >(`${API_ROUTES.NOTIFICATIONS.GET_ALL}?page=${page}&limit=200`);

        if (Array.isArray(response)) {
          allNotifications.push(...response);
          totalPages = 1;
        } else {
          allNotifications.push(...(response.notifications || []));
          totalPages = response.pagination?.totalPages || 1;
        }
        page += 1;
      } while (page <= totalPages);

      return allNotifications;
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
      const allBroadcasts: Notification[] = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await apiCall.get<
          { notifications?: Notification[]; pagination?: { totalPages?: number } } | Notification[]
        >(`${API_ROUTES.NOTIFICATIONS.GET_BROADCAST_HISTORY}&page=${page}&limit=200`);

        if (Array.isArray(response)) {
          allBroadcasts.push(...response);
          totalPages = 1;
        } else {
          allBroadcasts.push(...(response.notifications || []));
          totalPages = response.pagination?.totalPages || 1;
        }
        page += 1;
      } while (page <= totalPages);

      return allBroadcasts;
    },
    ...options,
  });
};

export const useGetUnreadNotificationsCount = (
  type: string = 'support',
  options?: UseQueryOptions<number>
) => {
  return useQuery<number>({
    queryKey: ['notifications', 'unread-count', type],
    queryFn: async () => {
      const res = await apiCall.get<{ count: number }>(
        `${API_ROUTES.NOTIFICATIONS.GET_UNREAD_COUNT}?type=${encodeURIComponent(type)}`
      );
      return typeof res?.count === 'number' ? res.count : 0;
    },
    staleTime: 5_000,
    refetchInterval: 5_000,
    ...options,
  });
};
