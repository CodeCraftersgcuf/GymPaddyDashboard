import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export interface SocialPost {
  id: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  fullName?: string;
  profile_picture?: string;
  content: string;
  post?: string;
  images?: string[];
  likes: number;
  like?: number;
  comments: number;
  shares: number;
  replies?: number;
  createdAt: string;
  date?: string;
  boostStatus?: string;
  postType?: string;
}

export interface Status {
  id: string;
  userId: string;
  content: string;
  media?: string;
  views: number;
  createdAt: string;
  expiresAt: string;
}

export interface LiveStream {
  id: string;
  userId: string;
  title: string;
  viewers: number;
  status: 'active' | 'ended';
  startedAt: string;
  endedAt?: string;
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
      } else if (Array.isArray(response.posts)) {
        posts = response.posts;
      }
      
      // Transform to match UserPostRow expectations
      return posts.map(post => ({
        ...post,
        fullName: post.userName || post.fullName,
        profile_picture: post.userAvatar || post.profile_picture,
        post: post.content || post.post,
        like: post.likes || post.like || 0,
        replies: post.shares || post.replies || 0,
        date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '',
        boostStatus: post.boostStatus || 'No',
        postType: post.postType || (post.images && post.images.length > 0 ? 'Image' : 'Text')
      }));
    },
    ...options,
  });
};

export const useGetUserPosts = (userId: string, options?: UseQueryOptions<SocialPost[]>) => {
  return useQuery<SocialPost[]>({
    queryKey: ['social', 'posts', 'user', userId],
    queryFn: () => apiCall.get<SocialPost[]>(API_ROUTES.SOCIAL.GET_USER_POSTS(userId)),
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
      return Array.isArray(response.statuses) ? response.statuses : [];
    },
    ...options,
  });
};

export const useGetLiveStreams = (options?: UseQueryOptions<LiveStream[]>) => {
  return useQuery<LiveStream[]>({
    queryKey: ['social', 'live'],
    queryFn: async () => {
      const response = await apiCall.get<{ liveStreams: LiveStream[] } | LiveStream[]>(API_ROUTES.SOCIAL.GET_LIVE_STREAMS);
      if (Array.isArray(response)) return response;
      return Array.isArray(response.liveStreams) ? response.liveStreams : [];
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
