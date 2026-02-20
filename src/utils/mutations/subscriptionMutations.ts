import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface CreateSubscriptionPayload {
  user_id: number;
  plan: string;
  amount: number;
  start_date: string;
  end_date: string;
}

export interface UpdateSubscriptionPayload {
  plan?: string;
  amount?: number;
  end_date?: string;
  status?: string;
}

export const useCreateSubscription = (options?: UseMutationOptions<any, Error, CreateSubscriptionPayload>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSubscriptionPayload) => 
      apiCall.post(API_ROUTES.SUBSCRIPTIONS.CREATE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
    ...options,
  });
};

export const useUpdateSubscription = (options?: UseMutationOptions<any, Error, { id: string; data: UpdateSubscriptionPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubscriptionPayload }) => 
      apiCall.put(API_ROUTES.SUBSCRIPTIONS.UPDATE(id), data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['subscription', variables.id] });
    },
    ...options,
  });
};

export const useCancelSubscription = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.post(API_ROUTES.SUBSCRIPTIONS.CANCEL(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['subscription', id] });
    },
    ...options,
  });
};
