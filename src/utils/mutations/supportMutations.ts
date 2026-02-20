import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface CreateTicketPayload {
  user_id: number;
  subject: string;
  message: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface UpdateTicketPayload {
  subject?: string;
  message?: string;
  status?: 'open' | 'in_progress' | 'closed';
  priority?: 'low' | 'medium' | 'high';
}

export const useCreateTicket = (options?: UseMutationOptions<any, Error, CreateTicketPayload>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTicketPayload) => 
      apiCall.post(API_ROUTES.SUPPORT.CREATE_TICKET, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support', 'tickets'] });
    },
    ...options,
  });
};

export const useUpdateTicket = (options?: UseMutationOptions<any, Error, { id: string; data: UpdateTicketPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTicketPayload }) => 
      apiCall.put(API_ROUTES.SUPPORT.UPDATE_TICKET(id), data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['support', 'tickets'] });
      queryClient.invalidateQueries({ queryKey: ['support', 'ticket', variables.id] });
    },
    ...options,
  });
};

export const useCloseTicket = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.post(API_ROUTES.SUPPORT.CLOSE_TICKET(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['support', 'tickets'] });
      queryClient.invalidateQueries({ queryKey: ['support', 'ticket', id] });
    },
    ...options,
  });
};
