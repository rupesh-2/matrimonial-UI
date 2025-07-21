import { Conversation, Message } from "@types/messages";
import { create } from "zustand";
import MessagesService from "../services/messagesService";

interface MessagesState {
  conversations: Conversation[];
  currentChatMessages: Message[];
  currentPage: number;
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  unreadCount: number;
}

interface MessagesStore extends MessagesState {
  getConversations: (page?: number) => Promise<void>;
  getChatHistory: (userId: number, page?: number) => Promise<void>;
  sendMessage: (
    receiverId: number,
    content: string,
    messageType?: "text" | "image" | "audio"
  ) => Promise<void>;
  markAsRead: (userId: number) => Promise<void>;
  deleteMessage: (messageId: number) => Promise<void>;
  getUnreadCount: () => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
  clearChatHistory: () => void;
  clearConversations: () => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  conversations: [],
  currentChatMessages: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,
  unreadCount: 0,

  getConversations: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MessagesService.getConversations(page);
      set({
        conversations:
          page === 1
            ? response.conversations
            : [...get().conversations, ...response.conversations],
        currentPage: response.current_page,
        totalPages: response.last_page,
        total: response.total,
        hasMore: response.current_page < response.last_page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to get conversations",
      });
    }
  },

  getChatHistory: async (userId: number, page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MessagesService.getChatHistory(userId, page);
      set({
        currentChatMessages:
          page === 1
            ? response.messages
            : [...get().currentChatMessages, ...response.messages],
        currentPage: response.current_page,
        totalPages: response.last_page,
        total: response.total,
        hasMore: response.current_page < response.last_page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to get chat history",
      });
    }
  },

  sendMessage: async (
    receiverId: number,
    content: string,
    messageType = "text"
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MessagesService.sendMessage({
        receiver_id: receiverId,
        content,
        message_type: messageType,
      });

      // Add the new message to current chat
      const newMessage: Message = {
        id: response.sent_message.id,
        sender_id: response.sent_message.sender_id,
        receiver_id: receiverId,
        content,
        message_type: messageType,
        is_read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      set({
        currentChatMessages: [...get().currentChatMessages, newMessage],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to send message",
      });
      throw error;
    }
  },

  markAsRead: async (userId: number) => {
    try {
      await MessagesService.markAsRead(userId);

      // Update messages in current chat
      const updatedMessages = get().currentChatMessages.map((message) =>
        message.sender_id === userId ? { ...message, is_read: true } : message
      );

      set({ currentChatMessages: updatedMessages });
    } catch (error: any) {
      console.error("Failed to mark messages as read:", error);
    }
  },

  deleteMessage: async (messageId: number) => {
    set({ isLoading: true, error: null });
    try {
      await MessagesService.deleteMessage(messageId);

      // Remove message from current chat
      const updatedMessages = get().currentChatMessages.filter(
        (message) => message.id !== messageId
      );
      set({
        currentChatMessages: updatedMessages,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete message",
      });
      throw error;
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await MessagesService.getUnreadCount();
      set({ unreadCount: response.unread_count });
    } catch (error) {
      console.error("Failed to get unread count:", error);
    }
  },

  loadMore: async () => {
    const { currentPage, hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;

    const nextPage = currentPage + 1;
    // This would need to be called with the current userId
    // For now, we'll just refresh
    await get().refresh();
  },

  refresh: async () => {
    await get().getConversations(1);
  },

  clearError: () => {
    set({ error: null });
  },

  clearChatHistory: () => {
    set({
      currentChatMessages: [],
      currentPage: 1,
      totalPages: 1,
      total: 0,
      hasMore: true,
    });
  },

  clearConversations: () => {
    set({
      conversations: [],
      currentPage: 1,
      totalPages: 1,
      total: 0,
      hasMore: true,
    });
  },
}));

export default useMessagesStore;
