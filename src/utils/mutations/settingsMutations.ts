import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';
import type { AppSettings } from '../queries/settingsQueries';

export const useUpdateSettings = (options?: UseMutationOptions<any, Error, Partial<AppSettings>>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AppSettings>) =>
      apiCall.put(API_ROUTES.SETTINGS.UPDATE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    ...options,
  });
};
