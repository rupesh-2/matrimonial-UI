import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import {
  ConversationsResponse,
  MessagesResponse,
  SendMessageData,
} from "@types/messages";

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

  static async sendMessage(data: SendMessageData): Promise<any> {
    const response = await apiClient.post(API_ENDPOINTS.MESSAGES.SEND, data);
    return response.data;
  }

  static async markAsRead(messageId: number): Promise<void> {
    await apiClient.put(`/api/messages/${messageId}/read`);
  }

  static async markConversationAsRead(userId: number): Promise<void> {
    await apiClient.put(`/api/messages/conversation/${userId}/read`);
  }

  static async deleteMessage(messageId: number): Promise<void> {
    await apiClient.delete(`/api/messages/${messageId}`);
  }

  static async deleteConversation(userId: number): Promise<void> {
    await apiClient.delete(`/api/messages/conversation/${userId}`);
  }
}

export default MessagesService;
