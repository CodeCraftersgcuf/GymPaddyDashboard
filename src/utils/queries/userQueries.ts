import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  status: 'online' | 'offline';
  lastLogin: string;
  profile_picture?: string | null;
  gender?: string;
  age?: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  onlineUsers: number;
}

export interface UserStatsBySection {
  totalUsers: number;
  socialUsers: number;
  connectUsers: number;
  marketplaceUsers: number;
  gymHubUsers: number;
}

export const useGetAllUsers = (options?: UseQueryOptions<User[]>) => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiCall.get<{ users: User[]; pagination: any }>(API_ROUTES.USERS.GET_ALL);
      return response.users || [];
    },
    ...options,
  });
};

export const useGetUserById = (id: string, options?: UseQueryOptions<User>) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => apiCall.get<User>(API_ROUTES.USERS.GET_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};

export const useGetUserByUsername = (username: string, options?: UseQueryOptions<User>) => {
  return useQuery<User>({
    queryKey: ['user', 'username', username],
    queryFn: () => apiCall.get<User>(API_ROUTES.USERS.GET_BY_USERNAME(username)),
    enabled: !!username,
    ...options,
  });
};

export const useGetUserStats = (options?: UseQueryOptions<UserStats>) => {
  return useQuery<UserStats>({
    queryKey: ['users', 'stats'],
    queryFn: () => apiCall.get<UserStats>(API_ROUTES.USERS.GET_STATS),
    ...options,
  });
};

export const useGetUserStatsBySection = (options?: UseQueryOptions<UserStatsBySection>) => {
  return useQuery<UserStatsBySection>({
    queryKey: ['users', 'stats-by-section'],
    queryFn: () => apiCall.get<UserStatsBySection>(API_ROUTES.USERS.GET_STATS_BY_SECTION),
    ...options,
  });
};

export interface UserChat {
  id: number;
  otherUserId: number;
  otherUserName: string;
  otherUsername: string;
  otherUserAvatar: string | null;
  lastMessage: string;
  lastMessageAt: string;
  messageCount: number;
  date: string;
}

export const useGetUserChats = (userId: string, options?: UseQueryOptions<UserChat[]>) => {
  return useQuery<UserChat[]>({
    queryKey: ['user', 'chats', userId],
    queryFn: async () => {
      const response = await apiCall.get<UserChat[] | any>(API_ROUTES.USER_MANAGEMENT.CHAT(userId));
      return Array.isArray(response) ? response : [];
    },
    enabled: !!userId,
    ...options,
  });
};
