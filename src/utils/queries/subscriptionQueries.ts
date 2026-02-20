import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface Subscription {
  id: number;
  user_id: number;
  plan: string;
  status: string;
  amount: number;
  start_date: string;
  end_date: string;
  user?: {
    username: string;
    fullName: string;
    profile_picture?: string;
  };
}

export interface SubscriptionStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  totalRevenue: number;
}

export const useGetAllSubscriptions = (options?: UseQueryOptions<Subscription[]>) => {
  return useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const response = await apiCall.get<{ subscriptions: Subscription[]; pagination?: any }>(API_ROUTES.SUBSCRIPTIONS.GET_ALL);
      return Array.isArray(response.subscriptions) ? response.subscriptions : [];
    },
    ...options,
  });
};

export const useGetSubscriptionById = (id: string, options?: UseQueryOptions<Subscription>) => {
  return useQuery<Subscription>({
    queryKey: ['subscription', id],
    queryFn: () => apiCall.get<Subscription>(API_ROUTES.SUBSCRIPTIONS.GET_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};

export const useGetUserSubscription = (userId: string, options?: UseQueryOptions<Subscription>) => {
  return useQuery<Subscription>({
    queryKey: ['subscription', 'user', userId],
    queryFn: () => apiCall.get<Subscription>(API_ROUTES.SUBSCRIPTIONS.GET_USER_SUBSCRIPTION(userId)),
    enabled: !!userId,
    ...options,
  });
};

export const useGetSubscriptionStats = (options?: UseQueryOptions<SubscriptionStats>) => {
  return useQuery<SubscriptionStats>({
    queryKey: ['subscriptions', 'stats'],
    queryFn: () => apiCall.get<SubscriptionStats>(API_ROUTES.SUBSCRIPTIONS.GET_STATS),
    ...options,
  });
};
