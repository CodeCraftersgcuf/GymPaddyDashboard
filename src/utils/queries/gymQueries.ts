import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface Gym {
  id: number;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
  status: string;
}

export interface GymStats {
  totalGyms: number;
  activeGyms: number;
  pendingApprovals: number;
}

export const useGetAllGyms = (options?: UseQueryOptions<Gym[]>) => {
  return useQuery<Gym[]>({
    queryKey: ['gyms'],
    queryFn: async () => {
      const response = await apiCall.get<{ gyms: Gym[] } | Gym[]>(API_ROUTES.GYM.GET_ALL_GYMS);
      if (Array.isArray(response)) return response;
      return Array.isArray(response.gyms) ? response.gyms : [];
    },
    ...options,
  });
};

export const useGetGymById = (id: string, options?: UseQueryOptions<Gym>) => {
  return useQuery<Gym>({
    queryKey: ['gym', id],
    queryFn: () => apiCall.get<Gym>(API_ROUTES.GYM.GET_GYM_BY_ID(id)),
    enabled: !!id,
    ...options,
  });
};

export const useGetGymStats = (options?: UseQueryOptions<GymStats>) => {
  return useQuery<GymStats>({
    queryKey: ['gyms', 'stats'],
    queryFn: () => apiCall.get<GymStats>(API_ROUTES.GYM.GET_STATS),
    ...options,
  });
};
