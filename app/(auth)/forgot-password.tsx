import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ForgotPasswordScreen() {
  // For now, just redirect back to login
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
