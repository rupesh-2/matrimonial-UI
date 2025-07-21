import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignUpScreen() {
  // Redirect to login screen since sign-up is handled in login-screen.tsx
  React.useEffect(() => {
    router.replace("/(auth)/login-screen");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Redirecting to login...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
