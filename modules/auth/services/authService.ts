import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../../../types/auth";

export class AuthService {
  static async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse> {
    console.log(
      "AuthService: Registering with endpoint:",
      API_ENDPOINTS.AUTH.REGISTER
    );
    console.log("AuthService: Registering with credentials:", credentials);

    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials
    );

    console.log("AuthService: Registration response:", response.data);

    if (response.data.token) {
      await apiClient.setAuthToken(response.data.token);
    }

    return response.data;
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log(
      "[AuthService] Attempting login to:",
      `${API_ENDPOINTS.AUTH.LOGIN}`
    );
    console.log("[AuthService] Login credentials:", {
      email: credentials.email,
      password: "***",
    });

    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      console.log("[AuthService] Login successful");

      if (response.data.token) {
        await apiClient.setAuthToken(response.data.token);
      }

      return response.data;
    } catch (error: any) {
      console.error("[AuthService] Login failed:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
      });
      throw error;
    }
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
