import apiClient from '../config/apiConfig';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiCallOptions extends AxiosRequestConfig {
  showErrorToast?: boolean;
}

interface BackendResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export const apiCall = {
  get: async <T = any>(url: string, options?: ApiCallOptions): Promise<T> => {
    try {
      const response: AxiosResponse<BackendResponse<T>> = await apiClient.get(url, options);
      return handleResponse(response);
    } catch (error: any) {
      handleApiError(error, options?.showErrorToast);
      throw error;
    }
  },

  post: async <T = any>(url: string, data?: any, options?: ApiCallOptions): Promise<T> => {
    try {
      const response: AxiosResponse<BackendResponse<T>> = await apiClient.post(url, data, options);
      return handleResponse(response);
    } catch (error: any) {
      handleApiError(error, options?.showErrorToast);
      throw error;
    }
  },

  put: async <T = any>(url: string, data?: any, options?: ApiCallOptions): Promise<T> => {
    try {
      const response: AxiosResponse<BackendResponse<T>> = await apiClient.put(url, data, options);
      return handleResponse(response);
    } catch (error: any) {
      handleApiError(error, options?.showErrorToast);
      throw error;
    }
  },

  patch: async <T = any>(url: string, data?: any, options?: ApiCallOptions): Promise<T> => {
    try {
      const response: AxiosResponse<BackendResponse<T>> = await apiClient.patch(url, data, options);
      return handleResponse(response);
    } catch (error: any) {
      handleApiError(error, options?.showErrorToast);
      throw error;
    }
  },

  delete: async <T = any>(url: string, options?: ApiCallOptions): Promise<T> => {
    try {
      const response: AxiosResponse<BackendResponse<T>> = await apiClient.delete(url, options);
      return handleResponse(response);
    } catch (error: any) {
      handleApiError(error, options?.showErrorToast);
      throw error;
    }
  },
};

const handleResponse = <T>(response: AxiosResponse<BackendResponse<T> | T>): T => {
  const responseData = response.data as any;
  
  // Check if response has the standard wrapper format {success, data}
  if (responseData.success !== undefined) {
    const { success, data, error } = responseData as BackendResponse<T>;

    if (success) {
      return data !== undefined ? data : responseData as T;
    }

    throw new Error(error?.message || 'Request failed');
  }
  
  // Handle direct response (like login endpoint)
  return responseData as T;
};

const handleApiError = (error: any, showToast: boolean = true) => {
  const errorMessage = error.response?.data?.error?.message 
    || error.response?.data?.message 
    || error.message 
    || 'An error occurred';
  
  if (showToast) {
    console.error('API Error:', errorMessage);
  }
  
  return errorMessage;
};

export default apiCall;
