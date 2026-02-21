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
  image?: string | null;
  location?: string;
  userName?: string;
  username?: string;
  userImage?: string | null;
  createdAt: string;
  date?: string;
}

export interface MarketStats {
  totalListings: number;
  activeListings: number;
  boostedListings: number;
  totalRevenue: number;
}

const normalizeListing = (l: any): MarketListing => ({
  id: String(l.id),
  name: l.name || l.title || '—',
  description: l.description || '',
  price: l.price ?? 0,
  category: l.category || '—',
  status: l.status || 'active',
  boostedStatus: l.boostedStatus || (l.is_boosted ? 'boosted' : 'normal'),
  images: l.images || l.media_urls || [],
  image: l.image || l.images?.[0] || l.media_urls?.[0] || null,
  location: l.location || '—',
  userName: l.userName || l.user?.fullname || 'Unknown',
  username: l.username || l.user?.username || '',
  userImage: l.userImage || l.user?.profile_picture || null,
  createdAt: l.createdAt || l.created_at || '',
  date: l.date || (l.created_at ? new Date(l.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) : ''),
});

export const useGetAllListings = (options?: UseQueryOptions<MarketListing[]>) => {
  return useQuery<MarketListing[]>({
    queryKey: ['market', 'listings'],
    queryFn: async () => {
      const response = await apiCall.get<any>(API_ROUTES.MARKET.GET_ALL_LISTINGS);
      let listings: any[] = [];
      if (Array.isArray(response)) {
        listings = response;
      } else if (response?.listings && Array.isArray(response.listings)) {
        listings = response.listings;
      }
      return listings.map(normalizeListing);
    },
    ...options,
  });
};

export const useGetUserListings = (userId: string, options?: UseQueryOptions<MarketListing[]>) => {
  return useQuery<MarketListing[]>({
    queryKey: ['market', 'listings', 'user', userId],
    queryFn: async () => {
      const response = await apiCall.get<MarketListing[] | any>(API_ROUTES.MARKET.GET_USER_LISTINGS(userId));
      const listings: any[] = Array.isArray(response) ? response : (response?.listings || []);
      return listings.map(normalizeListing);
    },
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
