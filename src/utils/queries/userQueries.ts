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

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface UsersPage {
  users: User[];
  pagination: PaginationMeta;
}

interface FetchAllUsersForExportParams {
  status?: string;
  search?: string;
  limit?: number;
  section?: 'social' | 'marketplace' | 'connect' | 'gym';
}

export const useGetAllUsers = (
  page = 1,
  limit = 20,
  filters?: { search?: string; status?: string; section?: 'social' | 'marketplace' | 'connect' | 'gym' },
  options?: UseQueryOptions<UsersPage>
) => {
  const search = filters?.search?.trim() || '';
  const status = filters?.status && filters.status !== 'all' ? filters.status : '';
  const section = filters?.section || '';

  return useQuery<UsersPage>({
    queryKey: ['users', page, limit, search, status, section],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(limit));
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      if (section) params.set('section', section);

      const response = await apiCall.get<UsersPage>(
        `${API_ROUTES.USERS.GET_ALL}?${params.toString()}`
      );
      return {
        users: response?.users ?? [],
        pagination: response?.pagination ?? { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: limit },
      };
    },
    ...options,
  });
};

export const fetchAllUsersForExport = async ({
  status,
  search,
  limit = 200,
  section,
}: FetchAllUsersForExportParams = {}): Promise<User[]> => {
  const allUsers: User[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (status && status !== 'all') {
      params.set('status', status);
    }
    if (search && search.trim()) {
      params.set('search', search.trim());
    }
    if (section) {
      params.set('section', section);
    }

    const response = await apiCall.get<UsersPage>(
      `${API_ROUTES.USERS.GET_ALL}?${params.toString()}`
    );
    const pageUsers = response?.users || [];
    const pagination = response?.pagination || { totalPages: 1 };

    allUsers.push(...pageUsers);
    totalPages = pagination.totalPages || 1;
    page += 1;
  } while (page <= totalPages);

  return allUsers;
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
  id: number | string;
  type?: 'chat' | 'support';
  otherUserId: number;
  otherUserName: string;
  otherUsername: string;
  otherUserAvatar: string | null;
  lastMessage: string;
  lastMessageAt: string;
  messageCount: number;
  date: string;
  subject?: string;
  status?: string;
}

export interface ChatMessageItem {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string | null;
  message: string;
  image: string | null;
  read: boolean;
  createdAt: string;
  time: string;
  date: string;
}

export interface ConversationDetail {
  id: number;
  user1: { id: number; name: string; username: string; avatar: string | null };
  user2: { id: number; name: string; username: string; avatar: string | null };
  messages: ChatMessageItem[];
}

export interface TicketDetail {
  id: number;
  subject: string;
  message: string;
  status: string;
  user: { id: number; name: string; username: string; avatar: string | null };
  createdAt: string;
  date: string;
  time: string;
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

export const useGetConversationMessages = (conversationId: string, options?: UseQueryOptions<ConversationDetail>) => {
  return useQuery<ConversationDetail>({
    queryKey: ['conversation', conversationId],
    queryFn: () => apiCall.get<ConversationDetail>(API_ROUTES.USER_MANAGEMENT.CONVERSATION_MESSAGES(conversationId)),
    enabled: !!conversationId,
    ...options,
  });
};

export const useGetTicketDetails = (ticketId: string, options?: UseQueryOptions<TicketDetail>) => {
  return useQuery<TicketDetail>({
    queryKey: ['ticket', ticketId],
    queryFn: () => apiCall.get<TicketDetail>(API_ROUTES.USER_MANAGEMENT.TICKET_DETAILS(ticketId)),
    enabled: !!ticketId,
    ...options,
  });
};
