import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface OverallAnalytics {
  totalUsers: number;
  onlineUsers: number;
  activeUsers: number;
  bounceRate: number;
  deletedAccounts: number;
  totalRevenue: number;
  totalDeposits: number;
  totalWithdrawals: number;
}

export interface UserAnalytics {
  totalUsers: number;
  onlineUsers: number;
  activeUsers: number;
  bounceRate: number;
  deletedAccounts: number;
  newUsersToday: number;
}

export interface RevenueAnalytics {
  totalDeposits: number;
  totalWithdrawals: number;
  adminEarnings: number;
  adsEarnings: number;
  socialEarnings: number;
  livestreamEarnings: number;
  withdrawalCommission: number;
  marketEarnings: number;
  totalSubscribers: number;
  recurringSubscribers: number;
}

export interface AdsAnalytics {
  totalAdsPlaced: number;
  onlineAds: number;
  pendingAds: number;
  closedAds: number;
  boostedPosts: number;
  activeBoosts: number;
}

export const useGetOverallAnalytics = (options?: UseQueryOptions<OverallAnalytics>) => {
  return useQuery<OverallAnalytics>({
    queryKey: ['analytics', 'overall'],
    queryFn: () => apiCall.get<OverallAnalytics>(API_ROUTES.ANALYTICS.GET_ALL),
    ...options,
  });
};

export const useGetUserAnalytics = (options?: UseQueryOptions<UserAnalytics>) => {
  return useQuery<UserAnalytics>({
    queryKey: ['analytics', 'users'],
    queryFn: () => apiCall.get<UserAnalytics>(API_ROUTES.ANALYTICS.GET_USER_ANALYTICS),
    ...options,
  });
};

export const useGetRevenueAnalytics = (options?: UseQueryOptions<RevenueAnalytics>) => {
  return useQuery<RevenueAnalytics>({
    queryKey: ['analytics', 'revenue'],
    queryFn: () => apiCall.get<RevenueAnalytics>(API_ROUTES.ANALYTICS.GET_REVENUE_ANALYTICS),
    ...options,
  });
};

export const useGetAdsAnalytics = (options?: UseQueryOptions<AdsAnalytics>) => {
  return useQuery<AdsAnalytics>({
    queryKey: ['analytics', 'ads'],
    queryFn: () => apiCall.get<AdsAnalytics>(API_ROUTES.ANALYTICS.GET_ADS_ANALYTICS),
    ...options,
  });
};
