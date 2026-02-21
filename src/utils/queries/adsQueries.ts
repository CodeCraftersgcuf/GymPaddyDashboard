import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface Ad {
  id: number;
  image?: string | null;
  name: string;
  username?: string | null;
  userImage?: string | null;
  location?: string;
  title: string;
  price: string;
  description: string;
  category: string;
  type: 'post' | 'listing' | string;
  duration: string;
  date: string;
  dateCreated: string;
  startDate: string;
  endDate: string;
  listingStatus: string;
  adStatus: string;
  status: 'active' | 'paused' | 'completed' | 'pending' | string;
  budget: number;
  amountSpent: string;
  boostDuration: string;
  impressions: number;
  clicks: number;
}

export interface AdsStats {
  totalAds: number;
  activeAds: number;
  pausedAds: number;
  totalBudget: number;
  totalImpressions: number;
  totalClicks: number;
  totalSpent?: number;
  averageCTR?: number;
}

export const useGetAllAds = (options?: UseQueryOptions<Ad[]>) => {
  return useQuery<Ad[]>({
    queryKey: ['ads'],
    queryFn: async () => {
      const response = await apiCall.get<{ ads: Ad[] } | Ad[]>(API_ROUTES.ADS.GET_ALL);
      if (Array.isArray(response)) return response;
      return Array.isArray(response.ads) ? response.ads : [];
    },
    ...options,
  });
};

export const useGetAdById = (id: string, options?: UseQueryOptions<Ad>) => {
  return useQuery<Ad>({
    queryKey: ['ad', id],
    queryFn: () => apiCall.get<Ad>(API_ROUTES.ADS.GET_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};

export const useGetAdsStats = (options?: UseQueryOptions<AdsStats>) => {
  return useQuery<AdsStats>({
    queryKey: ['ads', 'stats'],
    queryFn: () => apiCall.get<AdsStats>(API_ROUTES.ADS.GET_STATS),
    ...options,
  });
};
