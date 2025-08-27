import { Platform } from "react-native";

// Use different URLs for different environments
const isDevelopment = __DEV__;
const isAndroid = Platform.OS === "android";

// For Android emulator, use 10.0.2.2 instead of 127.0.0.1
// For physical Android device, use your computer's IP address
const getBaseUrl = () => {
  if (isDevelopment) {
    if (isAndroid) {
      // Check if running on physical device or emulator
      // For physical device, use your computer's IP address
      // For emulator, use 10.0.2.2
      return "http://192.168.1.69:8000"; // Physical Android device (Expo Go)
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
    LIKE: (userId: string) => `/api/discover/like/${userId}`,
    UNLIKE: (userId: string) => `/api/discover/unlike/${userId}`,
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
