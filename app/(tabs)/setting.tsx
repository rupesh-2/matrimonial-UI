import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import { useAuthStore } from "../../modules/auth/hooks/useAuth";

export default function SettingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login-screen");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEditProfile = () => {
    router.push("/profile-edit");
  };

  const handleNotifications = () => {
    router.push("/notifications-settings");
  };

  const handlePrivacy = () => {
    router.push("/privacy-settings");
  };

  const handleHelpSupport = () => {
    router.push("/help-support");
  };

  const handleTermsOfService = () => {
    router.push("/terms-of-service");
  };

  const handlePrivacyPolicy = () => {
    router.push("/privacy-policy");
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
        {/* Profile Section */}
        <View style={[styles.profileSection, isDark && styles.profileSectionDark]}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri:
                  user?.profile_picture ||
                  user?.photos?.[0] ||
                  `https://randomuser.me/api/portraits/${
                    user?.gender === "female" ? "women" : "men"
                  }/${user?.id || 1}.jpg`,
              }}
              style={styles.profileImage}
              contentFit="cover"
            />
            <View style={styles.profileInfo}>
              <ThemedText style={styles.profileName}>
                {user?.name || "User Name"}
              </ThemedText>
              <ThemedText style={styles.profileEmail}>
                {user?.email || "user@example.com"}
              </ThemedText>
              <ThemedText style={styles.profileLocation}>
                {user?.location || "Location not set"}
              </ThemedText>
            </View>
            <Pressable style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={20} color="#FF6B8B" />
            </Pressable>
          </View>
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Account</ThemedText>

          <Pressable style={[styles.settingItem, isDark && styles.settingItemDark]} onPress={handleEditProfile}>
            <Ionicons name="person-outline" size={24} color={isDark ? "#ccc" : "#666"} />
            <ThemedText style={[styles.settingText, isDark && styles.settingTextDark]}>Edit Profile</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.settingItem, isDark && styles.settingItemDark]} onPress={handleNotifications}>
            <Ionicons name="notifications-outline" size={24} color={isDark ? "#ccc" : "#666"} />
            <ThemedText style={[styles.settingText, isDark && styles.settingTextDark]}>Notifications</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.settingItem, isDark && styles.settingItemDark]} onPress={handlePrivacy}>
            <Ionicons name="shield-outline" size={24} color={isDark ? "#ccc" : "#666"} />
            <ThemedText style={[styles.settingText, isDark && styles.settingTextDark]}>Privacy</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Support</ThemedText>

          <Pressable style={[styles.settingItem, isDark && styles.settingItemDark]} onPress={handleHelpSupport}>
            <Ionicons name="help-circle-outline" size={24} color={isDark ? "#ccc" : "#666"} />
            <ThemedText style={[styles.settingText, isDark && styles.settingTextDark]}>Help & Support</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.settingItem, isDark && styles.settingItemDark]} onPress={handleTermsOfService}>
            <Ionicons name="document-text-outline" size={24} color={isDark ? "#ccc" : "#666"} />
            <ThemedText style={[styles.settingText, isDark && styles.settingTextDark]}>Terms of Service</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.settingItem, isDark && styles.settingItemDark]} onPress={handlePrivacyPolicy}>
            <Ionicons name="lock-closed-outline" size={24} color={isDark ? "#ccc" : "#666"} />
            <ThemedText style={[styles.settingText, isDark && styles.settingTextDark]}>Privacy Policy</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <Pressable
            style={[styles.settingItem, styles.logoutItem, isDark && styles.settingItemDark]}
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
  profileSection: {
    marginTop: 20,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    padding: 20,
  },
  profileSectionDark: {
    backgroundColor: "#1e1e1e",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  profileLocation: {
    fontSize: 14,
    color: "#999",
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 107, 139, 0.1)",
  },
  section: {
    marginTop: 20,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionDark: {
    backgroundColor: "#1e1e1e",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitleDark: {
    color: "#fff",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingItemDark: {
    borderBottomColor: "#333",
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  settingTextDark: {
    color: "#fff",
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#FF6B8B",
    fontWeight: "600",
  },
});
