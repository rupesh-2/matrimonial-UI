import { create } from "zustand";
import { Conversation, Message } from "../../../types/messages";
import MessagesService from "../services/messagesService";

interface MessagesState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  getConversations: (page: number) => Promise<void>;
  getChatHistory: (userId: number) => Promise<void>;
  sendMessage: (userId: number, content: string) => Promise<void>;
  refresh: () => void;
  clearError: () => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,

  getConversations: async (page: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MessagesService.getConversations(page);
      set({
        conversations: response.conversations || [],
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.log("Conversations API not available, showing empty state");
      set({
        conversations: [],
        isLoading: false,
        error: null,
      });
    }
  },

  getChatHistory: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MessagesService.getChatHistory(userId);
      set({
        messages: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to load chat history",
      });
      throw error;
    }
  },

  sendMessage: async (userId: number, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MessagesService.sendMessage(userId, content);
      // Add the new message to the current messages
      set({
        messages: [...get().messages, response.data],
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to send message",
      });
      throw error;
    }
  },

  refresh: () => {
    const { getConversations } = get();
    getConversations(1);
  },

  clearError: () => {
    set({ error: null });
  },

  setCurrentConversation: (conversation: Conversation | null) => {
    set({ currentConversation: conversation });
  },
}));

export default useMessagesStore;
