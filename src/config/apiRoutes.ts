export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/admin/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  USERS: {
    GET_ALL: '/admin/users',
    GET_BY_ID: (id: string) => `/admin/users/${id}`,
    GET_BY_USERNAME: (username: string) => `/admin/users/username/${username}`,
    CREATE: '/admin/users',
    UPDATE: (id: string) => `/admin/users/${id}`,
    DELETE: (id: string) => `/admin/users/${id}`,
    BAN: (id: string) => `/admin/users/${id}/ban`,
    UNBAN: (id: string) => `/admin/users/${id}/unban`,
    GET_STATS: '/admin/users/stats',
    GET_STATS_BY_SECTION: '/admin/users/stats-by-section',
  },

  DASHBOARD: {
    GET_STATS: '/admin/dashboard/stats',
    GET_LATEST_USERS: '/admin/dashboard/latest-users',
    GET_LATEST_POSTS: '/admin/dashboard/latest-posts',
    GET_USER_STATISTICS: '/admin/dashboard/user-statistics',
  },

  SOCIAL: {
    GET_ALL_POSTS: '/admin/social/posts',
    GET_POST_BY_ID: (id: string) => `/admin/social/posts/${id}`,
    GET_USER_POSTS: (userId: string) => `/admin/social/posts/user/${userId}`,
    DELETE_POST: (id: string) => `/admin/social/posts/${id}`,
    GET_STATUSES: '/admin/social/statuses',
    GET_USER_STATUSES: (userId: string) => `/admin/social/statuses/user/${userId}`,
    GET_STATUS_BY_ID: (id: string) => `/admin/social/statuses/${id}`,
    DELETE_STATUS: (id: string) => `/admin/social/statuses/${id}`,
    GET_LIVE_STREAMS: '/admin/social/live',
    GET_USER_LIVE_STREAMS: (userId: string) => `/admin/social/live/user/${userId}`,
    GET_LIVE_BY_ID: (id: string) => `/admin/social/live/${id}`,
    END_LIVE: (id: string) => `/admin/social/live/${id}/end`,
    GET_STATS: '/admin/social/stats',
  },

  MARKET: {
    GET_ALL_LISTINGS: '/admin/market/listings',
    GET_LISTING_BY_ID: (id: string) => `/admin/market/listings/${id}`,
    GET_USER_LISTINGS: (userId: string) => `/admin/market/listings/user/${userId}`,
    CREATE_LISTING: '/admin/market/listings',
    UPDATE_LISTING: (id: string) => `/admin/market/listings/${id}`,
    DELETE_LISTING: (id: string) => `/admin/market/listings/${id}`,
    BOOST_LISTING: (id: string) => `/admin/market/listings/${id}/boost`,
    GET_STATS: '/admin/market/stats',
  },

  CONNECT: {
    GET_ALL_USERS: '/admin/connect/users',
    GET_USER_BY_ID: (id: string) => `/admin/connect/users/${id}`,
    GET_MATCHES: (userId: string) => `/admin/connect/matches/${userId}`,
    GET_STATS: '/admin/connect/stats',
  },

  GYM: {
    GET_ALL_GYMS: '/admin/gym/gyms',
    GET_GYM_BY_ID: (id: string) => `/admin/gym/gyms/${id}`,
    CREATE_GYM: '/admin/gym/gyms',
    UPDATE_GYM: (id: string) => `/admin/gym/gyms/${id}`,
    DELETE_GYM: (id: string) => `/admin/gym/gyms/${id}`,
    GET_STATS: '/admin/gym/stats',
  },

  TRANSACTIONS: {
    GET_ALL: '/admin/transactions',
    GET_BY_ID: (id: string) => `/admin/transactions/${id}`,
    GET_USER_TRANSACTIONS: (userId: string) => `/admin/transactions/user/${userId}`,
    GET_STATS: '/admin/transactions/stats',
  },

  SUBSCRIPTIONS: {
    GET_ALL: '/admin/subscriptions',
    GET_BY_ID: (id: string) => `/admin/subscriptions/${id}`,
    GET_USER_SUBSCRIPTION: (userId: string) => `/admin/subscriptions/user/${userId}`,
    CREATE: '/admin/subscriptions',
    UPDATE: (id: string) => `/admin/subscriptions/${id}`,
    CANCEL: (id: string) => `/admin/subscriptions/${id}/cancel`,
    GET_STATS: '/admin/subscriptions/stats',
  },

  VERIFICATIONS: {
    GET_ALL: '/admin/verifications',
    GET_BY_ID: (id: string) => `/admin/verifications/${id}`,
    GET_BY_USER: (userId: string) => `/admin/verifications/user/${userId}`,
    APPROVE: (id: string) => `/admin/verifications/${id}/approve`,
    REJECT: (id: string) => `/admin/verifications/${id}/reject`,
    GET_STATS: '/admin/verifications/stats',
  },

  ADS: {
    GET_ALL: '/admin/ads',
    GET_BY_ID: (id: string) => `/admin/ads/${id}`,
    CREATE: '/admin/ads',
    UPDATE: (id: string) => `/admin/ads/${id}`,
    DELETE: (id: string) => `/admin/ads/${id}`,
    PAUSE: (id: string) => `/admin/ads/${id}/pause`,
    RESUME: (id: string) => `/admin/ads/${id}/resume`,
    GET_STATS: '/admin/ads/stats',
  },

  ANALYTICS: {
    GET_ALL: '/admin/analytics',
    GET_USER_ANALYTICS: '/admin/analytics/users',
    GET_REVENUE_ANALYTICS: '/admin/analytics/revenue',
    GET_ADS_ANALYTICS: '/admin/analytics/ads',
  },

  NOTIFICATIONS: {
    GET_ALL: '/admin/notifications',
    GET_BY_ID: (id: string) => `/admin/notifications/${id}`,
    SEND: '/admin/notifications/send',
    SEND_BULK: '/admin/notifications/send-bulk',
    MARK_AS_READ: (id: string) => `/admin/notifications/${id}/read`,
  },

  USER_MANAGEMENT: {
    SOCIAL: (userId: string) => `/admin/user-management/social/${userId}`,
    MARKETPLACE: (userId: string) => `/admin/user-management/marketPlace/${userId}`,
    CHAT: (userId: string) => `/admin/user-management/chat/${userId}`,
    TRANSACTIONS: (userId: string) => `/admin/user-management/transactions/${userId}`,
  },

  SUPPORT: {
    GET_ALL_TICKETS: '/admin/support/tickets',
    GET_TICKET_BY_ID: (id: string) => `/admin/support/tickets/${id}`,
    CREATE_TICKET: '/admin/support/tickets',
    UPDATE_TICKET: (id: string) => `/admin/support/tickets/${id}`,
    CLOSE_TICKET: (id: string) => `/admin/support/tickets/${id}/close`,
  },

  ADMIN: {
    GET_ALL: '/admin/admin',
    GET_BY_ID: (id: string) => `/admin/admin/${id}`,
    CREATE: '/admin/admin',
    UPDATE: (id: string) => `/admin/admin/${id}`,
    DELETE: (id: string) => `/admin/admin/${id}`,
  },

  SETTINGS: {
    GET: '/admin/settings',
    UPDATE: '/admin/settings',
  },
};
