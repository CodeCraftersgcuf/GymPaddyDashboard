import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface Transaction {
  id: string;
  transactionId?: number;
  fullName?: string;
  username?: string | null;
  email?: string | null;
  profile_picture?: string | null;
  amount: number;
  type: 'topup' | 'withdrawal' | string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description?: string | null;
}

export interface TransactionStats {
  totalTransactions: number;
  totalRevenue: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingTransactions: number;
  completedTransactions: number;
}

export const useGetAllTransactions = (options?: UseQueryOptions<Transaction[]>) => {
  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await apiCall.get<{ transactions: Transaction[] }>(API_ROUTES.TRANSACTIONS.GET_ALL);
      return Array.isArray(response.transactions) ? response.transactions : [];
    },
    ...options,
  });
};

export const useGetUserTransactions = (userId: string, options?: UseQueryOptions<Transaction[]>) => {
  return useQuery<Transaction[]>({
    queryKey: ['transactions', 'user', userId],
    queryFn: async () => {
      const response = await apiCall.get<Transaction[] | any>(API_ROUTES.TRANSACTIONS.GET_USER_TRANSACTIONS(userId));
      if (Array.isArray(response)) return response;
      if (response?.transactions && Array.isArray(response.transactions)) return response.transactions;
      return [];
    },
    enabled: !!userId,
    ...options,
  });
};

export const useGetTransactionStats = (options?: UseQueryOptions<TransactionStats>) => {
  return useQuery<TransactionStats>({
    queryKey: ['transactions', 'stats'],
    queryFn: () => apiCall.get<TransactionStats>(API_ROUTES.TRANSACTIONS.GET_STATS),
    ...options,
  });
};
