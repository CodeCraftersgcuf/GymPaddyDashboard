import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface CreateListingPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  images?: File[];
}

export interface UpdateListingPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
}

export const useCreateListing = (options?: UseMutationOptions<any, Error, CreateListingPayload>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateListingPayload) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          value.forEach((file) => formData.append('images', file));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      return apiCall.post(API_ROUTES.MARKET.CREATE_LISTING, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market', 'listings'] });
    },
    ...options,
  });
};

export const useUpdateListing = (options?: UseMutationOptions<any, Error, { id: string; data: UpdateListingPayload }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListingPayload }) => 
      apiCall.put(API_ROUTES.MARKET.UPDATE_LISTING(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market', 'listings'] });
    },
    ...options,
  });
};

export const useDeleteListing = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.delete(API_ROUTES.MARKET.DELETE_LISTING(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market', 'listings'] });
    },
    ...options,
  });
};

export const useBoostListing = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiCall.post(API_ROUTES.MARKET.BOOST_LISTING(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market', 'listings'] });
    },
    ...options,
  });
};
