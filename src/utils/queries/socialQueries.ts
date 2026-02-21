import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface SocialPost {
  id: number | string;
  userId: string;
  userName?: string;
  username?: string;
  userAvatar?: string;
  fullName?: string;
  profile_picture?: string;
  content: string;
  post?: string;
  mediaUrl?: string | null;
  mediaType?: string;
  images?: string[];
  likes: number;
  like?: number;
  comments: number;
  shares: number;
  replies?: number;
  isBoosted?: boolean;
  createdAt: string;
  date?: string;
  boostStatus?: string;
  postType?: string;
}

export interface Status {
  id: number | string;
  userId: string;
  fullName?: string;
  username?: string;
  profile_picture?: string;
  postType?: string;
  postImage?: string;
  caption?: string;
  views: number;
  likes: number;
  status: 'Running' | 'Ended';
  date?: string;
  createdAt: string;
  expiresAt: string;
}

export interface LiveStreamItem {
  id: number | string;
  userId: string;
  fullName?: string;
  username?: string;
  profile_picture?: string;
  postType?: string;
  postImage?: string;
  title?: string;
  views: number;
  likes: number;
  earned: string;
  status: 'Running' | 'Ended';
  date?: string;
  createdAt: string;
}

export interface SocialStats {
  totalPosts: number;
  totalStatuses: number;
  activeLiveStreams: number;
  liveStreams: number;
}

export const useGetAllPosts = (options?: UseQueryOptions<SocialPost[]>) => {
  return useQuery<SocialPost[]>({
    queryKey: ['social', 'posts'],
    queryFn: async () => {
      const response = await apiCall.get<{ posts: SocialPost[] } | SocialPost[]>(API_ROUTES.SOCIAL.GET_ALL_POSTS);
      let posts: SocialPost[] = [];

      if (Array.isArray(response)) {
        posts = response;
      } else if (Array.isArray((response as any).posts)) {
        posts = (response as any).posts;
      }

      return posts.map(post => ({
        ...post,
        fullName: post.userName || post.fullName,
        profile_picture: post.userAvatar || post.profile_picture,
        post: post.content || post.post,
        like: post.likes || post.like || 0,
        replies: post.shares || post.replies || 0,
        date: post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''),
        boostStatus: post.boostStatus || 'No',
        postType: post.postType || (post.images && post.images.length > 0 ? 'Image' : 'Text'),
      }));
    },
    ...options,
  });
};

export const useGetUserPosts = (userId: string, options?: UseQueryOptions<SocialPost[]>) => {
  return useQuery<SocialPost[]>({
    queryKey: ['social', 'posts', 'user', userId],
    queryFn: async () => {
      const response = await apiCall.get<SocialPost[] | any>(API_ROUTES.SOCIAL.GET_USER_POSTS(userId));
      const posts: SocialPost[] = Array.isArray(response) ? response : [];
      return posts.map(post => ({
        ...post,
        fullName: post.userName || post.fullName,
        profile_picture: post.userAvatar || post.profile_picture,
        post: post.content || post.post,
        like: post.likes || post.like || 0,
        replies: post.shares || post.replies || 0,
        date: post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''),
        boostStatus: post.boostStatus || 'No',
        postType: post.postType || (post.images && post.images.length > 0 ? 'Image' : 'Text'),
      }));
    },
    enabled: !!userId,
    ...options,
  });
};

export const useGetUserStatuses = (userId: string, options?: UseQueryOptions<Status[]>) => {
  return useQuery<Status[]>({
    queryKey: ['social', 'statuses', 'user', userId],
    queryFn: async () => {
      const response = await apiCall.get<Status[] | any>(API_ROUTES.SOCIAL.GET_USER_STATUSES(userId));
      return Array.isArray(response) ? response : [];
    },
    enabled: !!userId,
    ...options,
  });
};

export const useGetUserLiveStreams = (userId: string, options?: UseQueryOptions<LiveStreamItem[]>) => {
  return useQuery<LiveStreamItem[]>({
    queryKey: ['social', 'live', 'user', userId],
    queryFn: async () => {
      const response = await apiCall.get<LiveStreamItem[] | any>(API_ROUTES.SOCIAL.GET_USER_LIVE_STREAMS(userId));
      return Array.isArray(response) ? response : [];
    },
    enabled: !!userId,
    ...options,
  });
};

export const useGetStatuses = (options?: UseQueryOptions<Status[]>) => {
  return useQuery<Status[]>({
    queryKey: ['social', 'statuses'],
    queryFn: async () => {
      const response = await apiCall.get<{ statuses: Status[] } | Status[]>(API_ROUTES.SOCIAL.GET_STATUSES);
      if (Array.isArray(response)) return response;
      return Array.isArray((response as any).statuses) ? (response as any).statuses : [];
    },
    ...options,
  });
};

export const useGetLiveStreams = (options?: UseQueryOptions<LiveStreamItem[]>) => {
  return useQuery<LiveStreamItem[]>({
    queryKey: ['social', 'live'],
    queryFn: async () => {
      const response = await apiCall.get<{ liveStreams: LiveStreamItem[] } | LiveStreamItem[]>(API_ROUTES.SOCIAL.GET_LIVE_STREAMS);
      if (Array.isArray(response)) return response;
      return Array.isArray((response as any).liveStreams) ? (response as any).liveStreams : [];
    },
    ...options,
  });
};

export const useGetSocialStats = (options?: UseQueryOptions<SocialStats>) => {
  return useQuery<SocialStats>({
    queryKey: ['social', 'stats'],
    queryFn: () => apiCall.get<SocialStats>(API_ROUTES.SOCIAL.GET_STATS),
    ...options,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string | number) =>
      apiCall.delete(API_ROUTES.SOCIAL.DELETE_POST(String(postId))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social', 'posts'] });
      queryClient.invalidateQueries({ queryKey: ['social', 'stats'] });
    },
  });
};

export const useDeleteStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (statusId: string | number) =>
      apiCall.delete(API_ROUTES.SOCIAL.DELETE_STATUS(String(statusId))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social', 'statuses'] });
      queryClient.invalidateQueries({ queryKey: ['social', 'stats'] });
    },
  });
};
