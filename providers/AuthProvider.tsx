import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { useAuthStore } from "../modules/auth/hooks/useAuth";
import { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginStore,
    register: registerStore,
    logout: logoutStore,
    getCurrentUser,
    clearError,
  } = useAuthStore();

  const login = async (email: string, password: string) => {
    await loginStore({ email, password });
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    await registerStore({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  const logout = async () => {
    await logoutStore();
  };

  useEffect(() => {
    // Check if user is authenticated on app start
    // Only try to get current user if we have a stored token
    const checkAuthStatus = async () => {
      try {
        // Check if there's a stored token first
        const token = await AsyncStorage.getItem("auth_token");
        if (token && !isAuthenticated && !isLoading) {
          console.log(
            "[AuthProvider] Found stored token, attempting to get current user"
          );
          await getCurrentUser();
        } else {
          console.log(
            "[AuthProvider] No stored token found, user needs to login"
          );
        }
      } catch (error) {
        console.log("[AuthProvider] Error checking auth status:", error);
      }
    };

    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
