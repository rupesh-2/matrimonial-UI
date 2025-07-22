import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import {
  ConversationsResponse,
  MessagesResponse,
  SendMessageData,
} from "../../../types/messages";

export class MessagesService {
  static async getConversations(
    page: number = 1
  ): Promise<ConversationsResponse> {
    const response = await apiClient.get<ConversationsResponse>(
      `${API_ENDPOINTS.MESSAGES.CONVERSATIONS}?page=${page}`
    );
    return response.data;
  }

  static async getChatHistory(
    userId: number,
    page: number = 1
  ): Promise<MessagesResponse> {
    const response = await apiClient.get<MessagesResponse>(
      `${API_ENDPOINTS.MESSAGES.CHAT_HISTORY(userId.toString())}?page=${page}`
    );
    return response.data;
  }

  static async sendMessage(
    data: SendMessageData
  ): Promise<{ message: string; sent_message: any }> {
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
