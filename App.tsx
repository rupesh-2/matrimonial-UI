import AppNavigator from "@navigation/AppNavigator";
import { AuthProvider } from "@providers/AuthProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
