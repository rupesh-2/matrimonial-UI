import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login-screen">
      <Stack.Screen
        name="login-screen"
        options={{
          headerShown: false,
          title: "Login",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: false,
          title: "Forgot Password",
        }}
      />
    </Stack>
  );
}
