import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import {
  ConversationsResponse,
  ChatHistoryResponse,
  SendMessageData,
} from "../../../types/messages";

export class MessagesService {
  static async getConversations(
    page: number = 1
  ): Promise<ConversationsResponse> {
    try {
      const response = await apiClient.get<ConversationsResponse>(
        `${API_ENDPOINTS.MESSAGES.CONVERSATIONS}?page=${page}`
      );
      return response.data;
    } catch (error) {
      // If conversations endpoint doesn't exist, return empty response
      console.log("Conversations endpoint not available, returning empty list");
      return {
        conversations: [],
        total: 0,
      };
    }
  }

  static async getChatHistory(
    userId: number,
    page: number = 1
  ): Promise<ChatHistoryResponse> {
    const response = await apiClient.get<ChatHistoryResponse>(
      `${API_ENDPOINTS.MESSAGES.CHAT_HISTORY(userId.toString())}?page=${page}`
    );
    return response.data;
  }

  static async sendMessage(data: {
    to_user_id: number;
    message: string;
  }): Promise<{ message: string; data: any }> {
    const response = await apiClient.post(API_ENDPOINTS.MESSAGES.SEND, data);
    return response.data;
  }

  static async markAsRead(userId: number): Promise<{ message: string }> {
    const response = await apiClient.post(`/api/messages/${userId}/read`);
    return response.data;
  }

  static async deleteMessage(messageId: number): Promise<{ message: string }> {
    const response = await apiClient.delete(`/api/messages/${messageId}`);
    return response.data;
  }

  static async getUnreadCount(): Promise<{ unread_count: number }> {
    const response = await apiClient.get("/api/messages/unread-count");
    return response.data;
  }
}

export default MessagesService;
