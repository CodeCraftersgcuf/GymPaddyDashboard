import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface AppSettings {
  video_call_cost: string;
  live_cost: string;
  vip_plan_cost: string;
}

export const useGetSettings = (options?: UseQueryOptions<AppSettings>) => {
  return useQuery<AppSettings>({
    queryKey: ['settings'],
    queryFn: () => apiCall.get<AppSettings>(API_ROUTES.SETTINGS.GET),
    ...options,
  });
};
