"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useAuthStore } from "../modules/auth/hooks/useAuth";
import MessagesService from "../modules/messages/services/messagesService";
import { Message, ApiMessage } from "../types/messages";

const { width, height } = Dimensions.get("window");

export default function ChatScreen() {
  console.log("🔍 ChatScreen component loaded!");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const params = useLocalSearchParams();

  console.log("🔍 ChatScreen - Received params:", params);

  // Get user data from params
  const userData = params.userData
    ? JSON.parse(params.userData as string)
    : null;
  const { user } = useAuthStore();

  console.log("🔍 ChatScreen - Parsed userData:", userData);
  console.log("🔍 ChatScreen - Current user:", user);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (userData?.id && user?.id) {
      loadChatHistory();
    }
  }, [userData?.id, user?.id]);

  const loadChatHistory = async () => {
    if (!userData?.id || !user?.id) {
      console.log("Missing user data or current user");
      return;
    }

    setIsLoading(true);
    try {
      const response = await MessagesService.getChatHistory(userData.id);

      // Convert API response to match our Message interface
      const messages = (response.messages || []).map((msg: ApiMessage) => ({
        id: msg.id,
        sender_id: msg.from_user_id,
        receiver_id: msg.to_user_id,
        content: msg.message,
        message_type: "text" as const,
        is_read: msg.is_read,
        created_at: msg.created_at,
        updated_at: msg.updated_at,
      }));

      setMessages(messages);
    } catch (error: any) {
      console.error("Error loading chat history:", error);
      Alert.alert("Error", "Failed to load chat history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !userData?.id || !user?.id) return;

    setIsSending(true);
    try {
      const messageData = {
        to_user_id: userData.id,
        message: newMessage.trim(),
      };

      const response = await MessagesService.sendMessage(messageData);

      // Add the new message to the local state using the response data
      if (response.data) {
        const newMessageObj: Message = {
          id: response.data.id,
          sender_id: response.data.from_user_id,
          receiver_id: response.data.to_user_id,
          content: response.data.message,
          message_type: "text",
          is_read: response.data.is_read,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
        };

        setMessages((prev) => [...prev, newMessageObj]);
      }

      setNewMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      if (error.response?.status === 403) {
        Alert.alert(
          "Cannot Send Message",
          "You can only send messages to users you've matched with. Please make sure you both have liked each other."
        );
      } else {
        Alert.alert("Error", "Failed to send message. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isOwnMessage = (message: Message) => {
    return message.sender_id === user?.id;
  };

  if (!userData) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA" },
        ]}
      >
        <View style={styles.errorContainer}>
          <Ionicons
            name="person-outline"
            size={60}
            color={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
          />
          <ThemedText style={styles.errorText}>User data not found</ThemedText>
          <ThemedText style={styles.errorSubtext}>
            Please go back and try again
          </ThemedText>
          <Pressable style={styles.retryButton} onPress={() => router.back()}>
            <ThemedText style={styles.retryButtonText}>Go Back</ThemedText>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA" },
      ]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={["#FF6B8B", "#FF8E8E", "#FFB3BA"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <View style={styles.userInfo}>
            <Image
              source={{
                uri:
                  userData.photos?.[0] ||
                  `https://randomuser.me/api/portraits/${
                    userData.gender === "female" ? "women" : "men"
                  }/${userData.id || 1}.jpg`,
              }}
              style={styles.userAvatar}
              contentFit="cover"
            />
            <View style={styles.userDetails}>
              <ThemedText style={styles.userName}>{userData.name}</ThemedText>
              <ThemedText style={styles.userStatus}>
                {userData.is_online ? "Online" : "Offline"}
              </ThemedText>
            </View>
          </View>

          <Pressable style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </Pressable>
        </View>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ThemedText style={styles.loadingText}>
              Loading messages...
            </ThemedText>
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No messages yet</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Start a conversation with {userData.name}!
            </ThemedText>
          </View>
        ) : (
          messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                isOwnMessage(message) ? styles.ownMessage : styles.otherMessage,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isOwnMessage(message) ? styles.ownBubble : styles.otherBubble,
                ]}
              >
                <ThemedText
                  style={[
                    styles.messageText,
                    isOwnMessage(message)
                      ? styles.ownMessageText
                      : styles.otherMessageText,
                  ]}
                >
                  {message.content}
                </ThemedText>
                <ThemedText style={styles.messageTime}>
                  {formatTime(message.created_at)}
                </ThemedText>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.textInput,
              { color: isDark ? "#FFFFFF" : "#000000" },
            ]}
            placeholder="Type a message..."
            placeholderTextColor={isDark ? "#888888" : "#666666"}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          <Pressable
            style={[
              styles.sendButton,
              (!newMessage.trim() || isSending) && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!newMessage.trim() || isSending}
          >
            <Ionicons
              name="send"
              size={20}
              color={newMessage.trim() && !isSending ? "white" : "#888888"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 16,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  userStatus: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    fontWeight: "500",
  },
  messageContainer: {
    marginBottom: 16,
  },
  ownMessage: {
    alignItems: "flex-end",
  },
  otherMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: width * 0.75,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: "#FF6B8B",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#F0F0F0",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  ownMessageText: {
    color: "white",
  },
  otherMessageText: {
    color: "#333",
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
    alignSelf: "flex-end",
  },
  inputContainer: {
    padding: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F8F9FA",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF6B8B",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FF6B8B",
    borderRadius: 20,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
