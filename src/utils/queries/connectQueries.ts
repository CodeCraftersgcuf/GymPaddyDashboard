import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface ConnectUser {
  id: number;
  username: string;
  fullName: string;
  profile_picture?: string;
  age?: number;
  gender?: string;
}

export interface ConnectStats {
  totalUsers: number;
  activeMatches: number;
  pendingRequests: number;
}

export const useGetAllConnectUsers = (options?: UseQueryOptions<ConnectUser[]>) => {
  return useQuery<ConnectUser[]>({
    queryKey: ['connect', 'users'],
    queryFn: async () => {
      const response = await apiCall.get<{ users: ConnectUser[] } | ConnectUser[]>(API_ROUTES.CONNECT.GET_ALL_USERS);
      if (Array.isArray(response)) return response;
      return Array.isArray(response.users) ? response.users : [];
    },
    ...options,
  });
};

export const useGetConnectUserById = (id: string, options?: UseQueryOptions<ConnectUser>) => {
  return useQuery<ConnectUser>({
    queryKey: ['connect', 'user', id],
    queryFn: () => apiCall.get<ConnectUser>(API_ROUTES.CONNECT.GET_USER_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};

export const useGetUserMatches = (userId: string, options?: UseQueryOptions<any[]>) => {
  return useQuery<any[]>({
    queryKey: ['connect', 'matches', userId],
    queryFn: () => apiCall.get<any[]>(API_ROUTES.CONNECT.GET_MATCHES(userId)),
    enabled: !!userId,
    ...options,
  });
};

export const useGetConnectStats = (options?: UseQueryOptions<ConnectStats>) => {
  return useQuery<ConnectStats>({
    queryKey: ['connect', 'stats'],
    queryFn: () => apiCall.get<ConnectStats>(API_ROUTES.CONNECT.GET_STATS),
    ...options,
  });
};
