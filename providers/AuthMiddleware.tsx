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

  // Show loading state if auth is loading
  if (isLoading) return null;

  // If not authenticated and not on a public route, redirect to login
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return <Redirect href="/(auth)/login-screen" />;
  }

  // If authenticated and on a public route, redirect to home
  if (user && PUBLIC_ROUTES.includes(pathname)) {
    return <Redirect href="../" />;
  }

  return <>{children}</>;
}
