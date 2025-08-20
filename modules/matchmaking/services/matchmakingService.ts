import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import { RecommendationResponse } from "../../../types/matchmaking";

export class MatchmakingService {
  static async getRecommendations(
    limit: number = 10,
    page: number = 1
  ): Promise<RecommendationResponse> {
    try {
      console.log(
        "Fetching recommendations from:",
        `${API_ENDPOINTS.MATCHMAKING.RECOMMENDATIONS}?limit=${limit}&page=${page}`
      );
      const response = await apiClient.get<any>(
        `${API_ENDPOINTS.MATCHMAKING.RECOMMENDATIONS}?limit=${limit}&page=${page}`
      );
      console.log("Recommendations response:", response.data);

      // Transform the API response to match expected structure
      const transformedResponse: RecommendationResponse = {
        data: response.data.recommendations || [],
        current_page: page,
        last_page: 1,
        total: response.data.total || 0,
        per_page: limit,
      };

      return transformedResponse;
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      throw error;
    }
  }

  static async getRecommendationsByFilters(filters: {
    minAge?: number;
    maxAge?: number;
    gender?: "male" | "female" | "both";
    maxDistance?: number;
    interests?: string[];
  }): Promise<RecommendationResponse> {
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

    const response = await apiClient.get<RecommendationResponse>(
      `${API_ENDPOINTS.MATCHMAKING.RECOMMENDATIONS}?${params.toString()}`
    );
    return response.data;
  }
}

export default MatchmakingService;
