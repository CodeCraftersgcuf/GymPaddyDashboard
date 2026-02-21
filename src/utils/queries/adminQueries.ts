import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: string;
  status: string;
  profile_picture: string;
  gender: string;
  createdAt: string;
  date: string;
  lastLogin?: string;
  permissions?: string[];
}

export const useGetAllAdmins = (options?: UseQueryOptions<AdminUser[]>) => {
  return useQuery<AdminUser[]>({
    queryKey: ['admins'],
    queryFn: async () => {
      const response = await apiCall.get<AdminUser[] | any>(API_ROUTES.ADMIN.GET_ALL);
      const admins: any[] = Array.isArray(response) ? response : [];
      return admins.map((a: any) => ({
        id: String(a.id),
        fullName: a.fullName || a.name || '',
        email: a.email || '',
        username: a.username || a.email || '',
        role: a.role || 'admin',
        status: a.status || 'active',
        profile_picture: a.profile_picture || '',
        gender: a.gender || '',
        createdAt: a.createdAt || a.created_at || '',
        date: a.date || (a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ' - ' + new Date(a.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''),
        lastLogin: a.lastLogin || a.createdAt || '',
        permissions: a.permissions || [],
      }));
    },
    ...options,
  });
};

export const useGetAdminById = (id: string, options?: UseQueryOptions<AdminUser>) => {
  return useQuery<AdminUser>({
    queryKey: ['admin', id],
    queryFn: async () => {
      const a = await apiCall.get<any>(API_ROUTES.ADMIN.GET_BY_ID(id));
      return {
        id: String(a.id),
        fullName: a.fullName || a.name || '',
        email: a.email || '',
        username: a.username || a.email || '',
        role: a.role || 'admin',
        status: a.status || 'active',
        profile_picture: a.profile_picture || '',
        gender: a.gender || '',
        createdAt: a.createdAt || '',
        date: a.date || (a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) : ''),
        lastLogin: a.lastLogin || '',
        permissions: a.permissions || [],
      };
    },
    enabled: !!id,
    ...options,
  });
};
