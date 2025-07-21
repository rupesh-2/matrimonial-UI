import { ThemedText } from "@/components/ThemedText";
import { useAuthStore } from "@domains/auth/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function SettingScreen() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login-screen");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF6B8B", "#FF8E8E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account</ThemedText>

          <Pressable style={styles.settingItem}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Edit Profile</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>

          <Pressable style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Notifications</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>

          <Pressable style={styles.settingItem}>
            <Ionicons name="shield-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Privacy</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Support</ThemedText>

          <Pressable style={styles.settingItem}>
            <Ionicons name="help-circle-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Help & Support</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>

          <Pressable style={styles.settingItem}>
            <Ionicons name="document-text-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Terms of Service</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>

          <Pressable style={styles.settingItem}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Privacy Policy</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Pressable
            style={[styles.settingItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF6B8B" />
            <ThemedText style={[styles.settingText, styles.logoutText]}>
              Logout
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    padding: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#FF6B8B",
    fontWeight: "600",
  },
});
