export const API_BASE_URL = "http://127.0.0.1:8000";

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: "/api/register",
    LOGIN: "/api/login",
    LOGOUT: "/api/logout",
    USER: "/api/user",
  },

  // User Profile
  PROFILE: {
    GET: "/api/profile",
    UPDATE: "/api/profile",
    PREFERENCES: "/api/profile/preferences",
  },

  // Matchmaking
  MATCHMAKING: {
    RECOMMENDATIONS: "/api/recommendations",
  },

  // Matches
  MATCHES: {
    LIST: "/api/matches",
    CREATE: (userId: string) => `/api/matches/${userId}`,
    REMOVE: (userId: string) => `/api/matches/${userId}`,
  },

  // Likes
  LIKES: {
    LIST: "/api/likes",
    LIKE: (userId: string) => `/api/likes/${userId}`,
    UNLIKE: (userId: string) => `/api/likes/${userId}`,
  },

  // Messages
  MESSAGES: {
    SEND: "/api/messages/send",
    CONVERSATIONS: "/api/messages",
    CHAT_HISTORY: (userId: string) => `/api/messages/${userId}`,
  },
} as const;

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;
