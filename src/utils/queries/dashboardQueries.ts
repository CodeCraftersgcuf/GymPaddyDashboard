import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalTransactions: number;
  activeSubscriptions: number;
}

export interface LatestUser {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  age: number;
  lastLogin: string;
  profileImage?: string | null;
}

export interface LatestPost {
  id: string;
  description: string;
  time: string;
  profile_picture?: string | null;
  userName?: string | null;
}

export interface UserStatistics {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export const useGetDashboardStats = (options?: UseQueryOptions<DashboardStats>) => {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => apiCall.get<DashboardStats>(API_ROUTES.DASHBOARD.GET_STATS),
    ...options,
  });
};

export const useGetLatestUsers = (options?: UseQueryOptions<LatestUser[]>) => {
  return useQuery<LatestUser[]>({
    queryKey: ['dashboard', 'latest-users'],
    queryFn: () => apiCall.get<LatestUser[]>(API_ROUTES.DASHBOARD.GET_LATEST_USERS),
    ...options,
  });
};

export const useGetLatestPosts = (options?: UseQueryOptions<LatestPost[]>) => {
  return useQuery<LatestPost[]>({
    queryKey: ['dashboard', 'latest-posts'],
    queryFn: () => apiCall.get<LatestPost[]>(API_ROUTES.DASHBOARD.GET_LATEST_POSTS),
    ...options,
  });
};

export const useGetUserStatistics = (period: string = '30d', options?: UseQueryOptions<UserStatistics>) => {
  return useQuery<UserStatistics>({
    queryKey: ['dashboard', 'user-statistics', period],
    queryFn: () => apiCall.get<UserStatistics>(`${API_ROUTES.DASHBOARD.GET_USER_STATISTICS}?period=${period}`),
    ...options,
  });
};
