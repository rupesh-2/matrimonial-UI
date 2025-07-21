import { Recommendation } from "@types/matchmaking";
import { create } from "zustand";
import MatchmakingService from "../services/matchmakingService";

interface MatchmakingState {
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  getRecommendations: (limit: number, page: number) => Promise<void>;
  refresh: () => void;
  clearError: () => void;
}

export const useMatchmakingStore = create<MatchmakingState>((set, get) => ({
  recommendations: [],
  isLoading: false,
  error: null,

  getRecommendations: async (limit: number, page: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MatchmakingService.getRecommendations(limit, page);
      set({
        recommendations: response.recommendations,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Failed to load recommendations",
      });
      throw error;
    }
  },

  refresh: () => {
    const { getRecommendations } = get();
    getRecommendations(10, 1);
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useMatchmakingStore;
