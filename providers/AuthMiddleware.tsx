import { Redirect, usePathname } from "expo-router";
import React from "react";
import { useAuthStore } from "../modules/auth/hooks/useAuth";

const PUBLIC_ROUTES = ["/(auth)/login-screen", "/(auth)/sign-up", "/(auth)/forgot-password"];

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const pathname = usePathname();

  console.log("AuthMiddleware - Current pathname:", pathname);
  console.log("AuthMiddleware - User:", user);
  console.log("AuthMiddleware - Is loading:", isLoading);

  // Show loading state if auth is loading
  if (isLoading) {
    console.log("AuthMiddleware - Showing loading state");
    return null;
  }

  // If not authenticated and not on a public route, redirect to login
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    console.log("AuthMiddleware - Redirecting to login");
    return <Redirect href="/(auth)/login-screen" />;
  }

  // If authenticated and on a public route, redirect to home
  if (user && PUBLIC_ROUTES.includes(pathname)) {
    console.log("AuthMiddleware - Redirecting to home");
    return <Redirect href="/(tabs)" />;
  }

  console.log("AuthMiddleware - Rendering children");
  return <>{children}</>;
}
