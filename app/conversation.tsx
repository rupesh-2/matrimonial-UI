"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useAuthStore } from "../modules/auth/hooks/useAuth";
import { useMessagesStore } from "../modules/messages/hooks/useMessages";
import { Conversation } from "../types/messages";

export default function ConversationScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // API Integration
  const { conversations, isLoading, error, getConversations, refresh } =
    useMessagesStore();
  const { user } = useAuthStore();

  useEffect(() => {
    console.log("🔍 Loading conversations...");
    getConversations(1).catch(() => {
      console.log("API not available, showing empty conversations");
    });
  }, []);

  const handleRefresh = () => {
    refresh();
  };

  // Filter chats based on search query
  const filteredChats = searchQuery
    ? (Array.isArray(conversations) ? conversations : []).filter(
        (conversation) =>
          (conversation?.user?.name || "")
            .toLowerCase()
            .includes((searchQuery || "").toLowerCase())
      )
    : Array.isArray(conversations)
    ? conversations
    : [];

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // Handle chat press - navigate to individual chat
  const handleChatPress = (conversation: Conversation) => {
    console.log("🔍 Chat pressed! Conversation:", conversation);

    if (!conversation?.user) {
      console.log("❌ No user data in conversation");
      return;
    }

    if (!user?.id) {
      console.log("❌ User not logged in");
      Alert.alert("Error", "Please log in to access chat.");
      return;
    }

    console.log("✅ Navigating to chat with user:", conversation.user.name);

    try {
      router.navigate({
        pathname: "/chat",
        params: {
          userData: JSON.stringify(conversation.user),
        },
      });
    } catch (error) {
      console.error("❌ Navigation error:", error);
      try {
        router.push({
          pathname: "/chat",
          params: {
            userData: JSON.stringify(conversation.user),
          },
        });
      } catch (fallbackError) {
        console.error("❌ Fallback navigation also failed:", fallbackError);
      }
    }
  };

  // Render a chat preview item
  const renderChatItem = ({ item }: { item: Conversation }) => {
    try {
      const { user, last_message, unread_count } = item;

      return (
        <Pressable
          style={[styles.chatItem, isDark && styles.chatItemDark]}
          onPress={() => handleChatPress(item)}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri:
                  (user?.photos && user.photos[0]) ||
                  user?.profile_picture ||
                  `https://randomuser.me/api/portraits/${
                    user?.gender === "female" ? "women" : "men"
                  }/${user?.id || 1}.jpg`,
              }}
              style={styles.avatar}
              contentFit="cover"
            />
            {user?.is_online && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <ThemedText style={styles.userName}>
                {user?.name || "Unknown"}, {user?.age || 0}
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                {formatTimestamp(last_message?.created_at)}
              </ThemedText>
            </View>
            <ThemedText
              style={[
                styles.lastMessage,
                !last_message?.is_read && styles.unreadMessage,
              ]}
              numberOfLines={1}
            >
              {last_message?.message || "No messages yet"}
            </ThemedText>
          </View>
          {(unread_count || 0) > 0 && (
            <View style={styles.unreadBadge}>
              <ThemedText style={styles.unreadCount}>{unread_count}</ThemedText>
            </View>
          )}
        </Pressable>
      );
    } catch (error) {
      console.error("Error rendering chat item:", error);
      return null;
    }
  };

  // Render loading state
  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FF6B8B" />
      <ThemedText style={styles.loadingText}>
        Loading conversations...
      </ThemedText>
    </View>
  );

  // Render error state
  const renderError = () => (
    <View style={styles.errorContainer}>
      <Ionicons
        name="alert-circle-outline"
        size={60}
        color={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
      />
      <ThemedText style={styles.errorText}>{error}</ThemedText>
      <Pressable style={styles.retryButton} onPress={handleRefresh}>
        <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, isDark ? styles.containerDark : null]}>
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
          <ThemedText style={styles.headerTitle}>Conversations</ThemedText>
          <View style={styles.headerActions}>
            <Pressable style={styles.headerButton} onPress={handleRefresh}>
              <Ionicons name="refresh" size={22} color="white" />
            </Pressable>
            <Pressable style={styles.headerButton}>
              <MaterialIcons name="more-vert" size={22} color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <BlurView
        intensity={90}
        tint={isDark ? "dark" : "light"}
        style={styles.searchContainer}
      >
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
            },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={isDark ? "#ccc" : "#666"}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor="#999"
            value={searchQuery || ""}
            onChangeText={(text) => setSearchQuery(text || "")}
          />
          {(searchQuery || "").length > 0 && (
            <Pressable
              style={styles.clearButton}
              onPress={() => setSearchQuery("")}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </Pressable>
          )}
        </View>
      </BlurView>

      {/* Content based on state */}
      {isLoading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : filteredChats.length > 0 ? (
        <FlatList
          data={Array.isArray(filteredChats) ? filteredChats : []}
          renderItem={renderChatItem}
          keyExtractor={(item) =>
            item?.user?.id?.toString() || Math.random().toString()
          }
          contentContainerStyle={styles.chatList}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>
                  No conversations yet
                </ThemedText>
                <ThemedText style={styles.emptySubtext}>
                  Start matching to see your conversations here
                </ThemedText>
              </View>
            ) : null
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={60}
            color={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
          />
          <ThemedText style={styles.emptyText}>
            {searchQuery ? "No conversations found" : "No conversations yet"}
          </ThemedText>
          {searchQuery && (
            <ThemedText style={styles.emptySubtext}>
              Try a different search term
            </ThemedText>
          )}
        </View>
      )}
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
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerButton: {
    marginLeft: 16,
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  chatList: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  chatItemDark: {
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CD964",
    borderWidth: 2,
    borderColor: "white",
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  unreadMessage: {
    fontWeight: "bold",
    color: "#333",
  },
  unreadBadge: {
    backgroundColor: "#FF6B8B",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FF6B8B",
    borderRadius: 20,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  clearButton: {
    padding: 4,
  },
});
