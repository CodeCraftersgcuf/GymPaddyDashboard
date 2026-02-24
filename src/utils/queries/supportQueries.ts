import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface SupportTicket {
  id: string;
  user_id: number;
  subject: string;
  message: string;
  admin_reply?: string | null;
  status: 'open' | 'pending' | 'in_progress' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  user?: {
    username: string;
    fullName?: string;
    profile_picture?: string;
  };
}

export const useGetAllTickets = (options?: UseQueryOptions<SupportTicket[]>) => {
  return useQuery<SupportTicket[]>({
    queryKey: ['support', 'tickets'],
    queryFn: async () => {
      const response = await apiCall.get<
        { tickets?: SupportTicket[]; data?: { tickets?: SupportTicket[] } } | SupportTicket[]
      >(API_ROUTES.SUPPORT.GET_ALL_TICKETS);
      if (Array.isArray(response)) return response;
      if (Array.isArray(response?.tickets)) return response.tickets;
      if (Array.isArray(response?.data?.tickets)) return response.data.tickets;
      return [];
    },
    ...options,
  });
};

export const useGetTicketById = (id: string, options?: UseQueryOptions<SupportTicket>) => {
  return useQuery<SupportTicket>({
    queryKey: ['support', 'ticket', id],
    queryFn: () => apiCall.get<SupportTicket>(API_ROUTES.SUPPORT.GET_TICKET_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};
