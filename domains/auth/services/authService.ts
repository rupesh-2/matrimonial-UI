import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@types/auth";

export class AuthService {
  static async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials
    );

    if (response.data.token) {
      await apiClient.setAuthToken(response.data.token);
    }

    return response.data;
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.data.token) {
      await apiClient.setAuthToken(response.data.token);
    }

    return response.data;
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await apiClient.logout();
    }
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.USER);
    return response.data;
  }

  static async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/api/refresh");

    if (response.data.token) {
      await apiClient.setAuthToken(response.data.token);
    }

    return response.data;
  }
}

export default AuthService;
