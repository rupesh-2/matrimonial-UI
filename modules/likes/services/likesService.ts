import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import { LikeActionResponse, LikeResponse } from "../../../types/likes";

export class LikesService {
  static async getLikes(page: number = 1): Promise<LikeResponse> {
    const response = await apiClient.get<LikeResponse>(
      `${API_ENDPOINTS.LIKES.LIST}?page=${page}`
    );
    return response.data;
  }

  static async likeUser(userId: number): Promise<LikeActionResponse> {
    const response = await apiClient.post<LikeActionResponse>(
      API_ENDPOINTS.LIKES.LIKE(userId.toString())
    );
    return response.data;
  }

  static async unlikeUser(userId: number): Promise<LikeActionResponse> {
    const response = await apiClient.delete<LikeActionResponse>(
      API_ENDPOINTS.LIKES.UNLIKE(userId.toString())
    );
    return response.data;
  }

  static async checkIfLiked(userId: number): Promise<{ is_liked: boolean }> {
    const response = await apiClient.get(`/api/likes/check/${userId}`);
    return response.data;
  }
}

export default LikesService;
