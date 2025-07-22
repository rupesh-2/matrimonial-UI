import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import { MatchResponse } from "../../../types/matches";

export class MatchesService {
  static async getMatches(page: number = 1): Promise<MatchResponse> {
    const response = await apiClient.get<MatchResponse>(
      `${API_ENDPOINTS.MATCHES.LIST}?page=${page}`
    );
    return response.data;
  }

  static async createMatch(
    userId: number
  ): Promise<{ message: string; match: any }> {
    const response = await apiClient.post(
      API_ENDPOINTS.MATCHES.CREATE(userId.toString())
    );
    return response.data;
  }

  static async removeMatch(userId: number): Promise<{ message: string }> {
    const response = await apiClient.delete(
      API_ENDPOINTS.MATCHES.REMOVE(userId.toString())
    );
    return response.data;
  }

  static async getMatchById(matchId: number): Promise<any> {
    const response = await apiClient.get(`/api/matches/${matchId}`);
    return response.data;
  }
}

export default MatchesService;
