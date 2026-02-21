import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface Verification {
  id: string;
  userId: number;
  userName: string;
  username: string;
  userEmail: string;
  userPhone: string;
  profilePicture?: string | null;
  businessName: string;
  category: string;
  businessEmail: string;
  businessPhone: string;
  photo?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  notes: string;
  created_at: string;
  createdAt: string;
}

export interface VerificationStats {
  totalVerifications: number;
  pendingVerifications: number;
  approvedVerifications: number;
  rejectedVerifications: number;
}

export const useGetAllVerifications = (options?: UseQueryOptions<Verification[]>) => {
  return useQuery<Verification[]>({
    queryKey: ['verifications'],
    queryFn: async () => {
      const response = await apiCall.get<{ verifications: Verification[]; pagination?: any } | Verification[]>(API_ROUTES.VERIFICATIONS.GET_ALL);
      if (Array.isArray(response)) return response;
      return Array.isArray(response.verifications) ? response.verifications : [];
    },
    ...options,
  });
};

export const useGetVerificationById = (id: string, options?: UseQueryOptions<Verification>) => {
  return useQuery<Verification>({
    queryKey: ['verification', id],
    queryFn: () => apiCall.get<Verification>(API_ROUTES.VERIFICATIONS.GET_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};

export const useGetVerificationStats = (options?: UseQueryOptions<VerificationStats>) => {
  return useQuery<VerificationStats>({
    queryKey: ['verifications', 'stats'],
    queryFn: () => apiCall.get<VerificationStats>(API_ROUTES.VERIFICATIONS.GET_STATS),
    ...options,
  });
};

export const useGetVerificationByUser = (userId: string, options?: UseQueryOptions<Verification>) => {
  return useQuery<Verification>({
    queryKey: ['verification', 'user', userId],
    queryFn: () => apiCall.get<Verification>(API_ROUTES.VERIFICATIONS.GET_BY_USER(userId)),
    enabled: !!userId,
    ...options,
  });
};
