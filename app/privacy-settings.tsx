"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  useColorScheme,
  View,
} from "react-native";

export default function PrivacySettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showOnlineStatus: true,
    allowProfileViews: true,
    showLastSeen: false,
    allowMessages: true,
    showAge: true,
    showLocation: true,
    showIncome: false,
  });

  const togglePrivacySetting = (key: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Account Deleted",
              "Your account has been deleted successfully."
            );
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <LinearGradient
        colors={["#FF6B8B", "#FF8E8E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>Privacy & Security</ThemedText>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Profile Visibility
          </ThemedText>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons name="eye" size={24} color={isDark ? "#ccc" : "#666"} />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Profile Visibility
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Allow others to see your profile
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.profileVisibility}
              onValueChange={() => togglePrivacySetting("profileVisibility")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={
                privacySettings.profileVisibility ? "#fff" : "#f4f3f4"
              }
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="wifi"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Online Status
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Show when you're online
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.showOnlineStatus}
              onValueChange={() => togglePrivacySetting("showOnlineStatus")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={privacySettings.showOnlineStatus ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="eye-outline"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Profile Views
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Allow others to see when you view their profile
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.allowProfileViews}
              onValueChange={() => togglePrivacySetting("allowProfileViews")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={
                privacySettings.allowProfileViews ? "#fff" : "#f4f3f4"
              }
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="time"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Last Seen
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Show when you were last active
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.showLastSeen}
              onValueChange={() => togglePrivacySetting("showLastSeen")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={privacySettings.showLastSeen ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Information Sharing
          </ThemedText>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="chatbubbles"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Allow Messages
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Allow others to send you messages
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.allowMessages}
              onValueChange={() => togglePrivacySetting("allowMessages")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={privacySettings.allowMessages ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="calendar"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Show Age
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Display your age on your profile
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.showAge}
              onValueChange={() => togglePrivacySetting("showAge")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={privacySettings.showAge ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="location"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Show Location
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Display your location on your profile
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.showLocation}
              onValueChange={() => togglePrivacySetting("showLocation")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={privacySettings.showLocation ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="cash"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Show Income
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Display your income on your profile
                </ThemedText>
              </View>
            </View>
            <Switch
              value={privacySettings.showIncome}
              onValueChange={() => togglePrivacySetting("showIncome")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={privacySettings.showIncome ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Account Security
          </ThemedText>

          <Pressable
            style={[styles.settingItem, isDark && styles.settingItemDark]}
          >
            <View style={styles.settingInfo}>
              <Ionicons
                name="lock-closed"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Change Password
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Update your account password
                </ThemedText>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDark ? "#666" : "#ccc"}
            />
          </Pressable>

          <Pressable
            style={[styles.settingItem, isDark && styles.settingItemDark]}
          >
            <View style={styles.settingInfo}>
              <Ionicons
                name="shield-checkmark"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Two-Factor Authentication
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Add an extra layer of security
                </ThemedText>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDark ? "#666" : "#ccc"}
            />
          </Pressable>
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <Pressable
            style={[
              styles.settingItem,
              styles.dangerItem,
              isDark && styles.settingItemDark,
            ]}
            onPress={handleDeleteAccount}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="trash" size={24} color="#FF3B30" />
              <View style={styles.settingTextContainer}>
                <ThemedText style={[styles.settingText, styles.dangerText]}>
                  Delete Account
                </ThemedText>
                <ThemedText
                  style={[styles.settingSubtext, styles.dangerSubtext]}
                >
                  Permanently delete your account and data
                </ThemedText>
              </View>
            </View>
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
  containerDark: {
    backgroundColor: "#121212",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
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
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingItemDark: {
    borderBottomColor: "#333",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  settingTextDark: {
    color: "#fff",
  },
  settingSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  settingSubtextDark: {
    color: "#ccc",
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  dangerSubtext: {
    color: "#FF3B30",
    opacity: 0.8,
  },
});
