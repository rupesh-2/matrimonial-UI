import { create } from "zustand";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../../../types/auth";
import AuthService from "../services/authService";

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AuthService.login(credentials);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Login failed",
      });
      throw error;
    }
  },

  register: async (credentials: RegisterCredentials) => {
    console.log("Auth store: Starting registration with credentials:", credentials);
    set({ isLoading: true, error: null });
    try {
      console.log("Auth store: Calling AuthService.register...");
      const response = await AuthService.register(credentials);
      console.log("Auth store: Registration successful, response:", response);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.log("Auth store: Registration failed, error:", error);
      set({
        isLoading: false,
        error: error.response?.data?.message || "Registration failed",
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logout();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Logout failed",
      });
    }
  },

  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const user = await AuthService.getCurrentUser();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || "Failed to get user",
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  setUser: (user: User) => {
    set({ user });
  },
}));

export default useAuthStore;
