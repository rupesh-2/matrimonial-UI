import { useAuthStore } from "@domains/auth/hooks/useAuth";
import { User } from "@types/auth";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

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
    if (!isAuthenticated && !isLoading) {
      getCurrentUser();
    }
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
