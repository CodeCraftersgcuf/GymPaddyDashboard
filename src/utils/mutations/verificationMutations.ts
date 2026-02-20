import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface ApproveVerificationPayload {
  notes?: string;
}

export interface RejectVerificationPayload {
  reason: string;
}

export const useApproveVerification = (options?: UseMutationOptions<any, Error, { id: string; data?: ApproveVerificationPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: ApproveVerificationPayload }) => 
      apiCall.post(API_ROUTES.VERIFICATIONS.APPROVE(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
    },
    ...options,
  });
};

export const useRejectVerification = (options?: UseMutationOptions<any, Error, { id: string; data: RejectVerificationPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RejectVerificationPayload }) => 
      apiCall.post(API_ROUTES.VERIFICATIONS.REJECT(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
    },
    ...options,
  });
};
