import { Platform } from "react-native";

// Use different URLs for different environments
const isDevelopment = __DEV__;
const isAndroid = Platform.OS === "android";

// For Android emulator, use 10.0.2.2 instead of 127.0.0.1
const getBaseUrl = () => {
  if (isDevelopment) {
    if (isAndroid) {
      return "http://10.0.2.2:8000"; // Android emulator
    } else {
      return "http://127.0.0.1:8000"; // iOS simulator or web
    }
  }
  return "https://your-production-api.com"; // Production
};

export const API_BASE_URL = getBaseUrl();

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/register",
    LOGIN: "/api/login",
    LOGOUT: "/api/logout",
    USER: "/api/user",
  },

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
