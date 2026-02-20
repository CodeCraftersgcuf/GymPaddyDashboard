import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface MarketListing {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
  boostedStatus: string;
  images?: string[];
  createdAt: string;
}

export interface MarketStats {
  totalListings: number;
  activeListings: number;
  boostedListings: number;
  totalRevenue: number;
}

export const useGetAllListings = (options?: UseQueryOptions<MarketListing[]>) => {
  return useQuery<MarketListing[]>({
    queryKey: ['market', 'listings'],
    queryFn: async () => {
      const response = await apiCall.get<{ listings: MarketListing[] } | MarketListing[]>(API_ROUTES.MARKET.GET_ALL_LISTINGS);
      if (Array.isArray(response)) return response;
      return Array.isArray(response.listings) ? response.listings : [];
    },
    ...options,
  });
};

export const useGetUserListings = (userId: string, options?: UseQueryOptions<MarketListing[]>) => {
  return useQuery<MarketListing[]>({
    queryKey: ['market', 'listings', 'user', userId],
    queryFn: () => apiCall.get<MarketListing[]>(API_ROUTES.MARKET.GET_USER_LISTINGS(userId)),
    enabled: !!userId,
    ...options,
  });
};

export const useGetMarketStats = (options?: UseQueryOptions<MarketStats>) => {
  return useQuery<MarketStats>({
    queryKey: ['market', 'stats'],
    queryFn: () => apiCall.get<MarketStats>(API_ROUTES.MARKET.GET_STATS),
    ...options,
  });
};
