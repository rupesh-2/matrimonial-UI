import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/api";

const TOKEN_KEY = "auth_token";

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.instance.interceptors.request.use(
      async (config) => {
        const token = await this.getToken();
        // Only log token status for debugging when needed
        if (process.env.NODE_ENV === "development") {
          console.log(
            `[API] ${config.method?.toUpperCase()} ${config.url} - Token: ${
              token ? "Present" : "Missing"
            }`
          );
        }
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error("[API] Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        console.error("[API] Response error:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          method: error.config?.method,
          message: error.message,
          code: error.code,
        });

        if (
          error.code === "ECONNREFUSED" ||
          error.message === "Network Error"
        ) {
          console.error(
            "[API] Server connection failed. Make sure your Laravel backend is running on:",
            API_BASE_URL
          );
        }

        if (error.response?.status === 401) {
          // Token expired or invalid, clear storage and redirect to login
          await this.clearToken();
          // Only log if it's not a missing token (which is expected for unauthenticated users)
          if (error.config?.url !== "/api/user") {
            console.log("[API] Authentication failed, token cleared");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  private async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error setting token:", error);
    }
  }

  private async clearToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  }

  public async setAuthToken(token: string): Promise<void> {
    await this.setToken(token);
  }

  public async logout(): Promise<void> {
    await this.clearToken();
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
