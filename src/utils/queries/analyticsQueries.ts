import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

export interface OverallAnalytics {
  users: { total: number; growth: number };
  revenue: { total: number; growth: number };
  transactions: { total: number; growth: number };
}

export interface UserAnalytics {
  chartData: ChartData;
  summary: {
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
    growth: number;
  };
}

export interface RevenueAnalytics {
  chartData: ChartData;
  summary: {
    totalRevenue: number;
    averageRevenue: number;
    growth: number;
  };
}

export interface AdsAnalytics {
  chartData: ChartData;
  summary: {
    totalImpressions: number;
    totalClicks: number;
    averageCTR: number;
    totalSpent: number;
  };
}

export const useGetOverallAnalytics = (period?: string, options?: UseQueryOptions<OverallAnalytics>) => {
  return useQuery<OverallAnalytics>({
    queryKey: ['analytics', 'overall', period],
    queryFn: async () => {
      const url = period ? `${API_ROUTES.ANALYTICS.GET_ALL}?period=${period}` : API_ROUTES.ANALYTICS.GET_ALL;
      return apiCall.get<OverallAnalytics>(url);
    },
    ...options,
  });
};

export const useGetUserAnalytics = (period: string = '30d', options?: UseQueryOptions<UserAnalytics>) => {
  return useQuery<UserAnalytics>({
    queryKey: ['analytics', 'users', period],
    queryFn: () => apiCall.get<UserAnalytics>(`${API_ROUTES.ANALYTICS.GET_USER_ANALYTICS}?period=${period}`),
    ...options,
  });
};

export const useGetRevenueAnalytics = (period: string = '30d', options?: UseQueryOptions<RevenueAnalytics>) => {
  return useQuery<RevenueAnalytics>({
    queryKey: ['analytics', 'revenue', period],
    queryFn: () => apiCall.get<RevenueAnalytics>(`${API_ROUTES.ANALYTICS.GET_REVENUE_ANALYTICS}?period=${period}`),
    ...options,
  });
};

export const useGetAdsAnalytics = (period: string = '30d', options?: UseQueryOptions<AdsAnalytics>) => {
  return useQuery<AdsAnalytics>({
    queryKey: ['analytics', 'ads', period],
    queryFn: () => apiCall.get<AdsAnalytics>(`${API_ROUTES.ANALYTICS.GET_ADS_ANALYTICS}?period=${period}`),
    ...options,
  });
};
