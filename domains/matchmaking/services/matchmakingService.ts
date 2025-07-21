import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import { RecommendationsResponse } from "@types/matches";

export class MatchmakingService {
  static async getRecommendations(
    limit: number = 10,
    page: number = 1
  ): Promise<RecommendationsResponse> {
    const response = await apiClient.get<RecommendationsResponse>(
      `${API_ENDPOINTS.MATCHMAKING.RECOMMENDATIONS}?limit=${limit}&page=${page}`
    );
    return response.data;
  }

  static async getRecommendationsByFilters(filters: {
    minAge?: number;
    maxAge?: number;
    gender?: "male" | "female" | "both";
    maxDistance?: number;
    interests?: string[];
  }): Promise<RecommendationsResponse> {
    const params = new URLSearchParams();

    if (filters.minAge) params.append("min_age", filters.minAge.toString());
    if (filters.maxAge) params.append("max_age", filters.maxAge.toString());
    if (filters.gender) params.append("gender", filters.gender);
    if (filters.maxDistance)
      params.append("max_distance", filters.maxDistance.toString());
    if (filters.interests) {
      filters.interests.forEach((interest) =>
        params.append("interests[]", interest)
      );
    }

    const response = await apiClient.get<RecommendationsResponse>(
      `${API_ENDPOINTS.MATCHMAKING.RECOMMENDATIONS}?${params.toString()}`
    );
    return response.data;
  }
}

export default MatchmakingService;
