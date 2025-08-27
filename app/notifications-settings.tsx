"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  useColorScheme,
  View,
} from "react-native";

export default function NotificationsSettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: true,
    profileViews: false,
    appUpdates: true,
    marketing: false,
  });

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
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
          <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Push Notifications
          </ThemedText>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="heart"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  New Matches
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Get notified when you have new matches
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications.newMatches}
              onValueChange={() => toggleNotification("newMatches")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={notifications.newMatches ? "#fff" : "#f4f3f4"}
            />
          </View>

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
                  Messages
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Get notified when you receive new messages
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications.messages}
              onValueChange={() => toggleNotification("messages")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={notifications.messages ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="heart-outline"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Likes
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Get notified when someone likes your profile
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications.likes}
              onValueChange={() => toggleNotification("likes")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={notifications.likes ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons name="eye" size={24} color={isDark ? "#ccc" : "#666"} />
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
                  Get notified when someone views your profile
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications.profileViews}
              onValueChange={() => toggleNotification("profileViews")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={notifications.profileViews ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            App Notifications
          </ThemedText>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="refresh"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  App Updates
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Get notified about app updates and new features
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications.appUpdates}
              onValueChange={() => toggleNotification("appUpdates")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={notifications.appUpdates ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="megaphone"
                size={24}
                color={isDark ? "#ccc" : "#666"}
              />
              <View style={styles.settingTextContainer}>
                <ThemedText
                  style={[styles.settingText, isDark && styles.settingTextDark]}
                >
                  Marketing
                </ThemedText>
                <ThemedText
                  style={[
                    styles.settingSubtext,
                    isDark && styles.settingSubtextDark,
                  ]}
                >
                  Receive promotional offers and updates
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications.marketing}
              onValueChange={() => toggleNotification("marketing")}
              trackColor={{ false: "#767577", true: "#FF6B8B" }}
              thumbColor={notifications.marketing ? "#fff" : "#f4f3f4"}
            />
          </View>
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
});
