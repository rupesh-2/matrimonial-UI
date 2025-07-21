import { Recommendation } from "@types/matches";
import { create } from "zustand";
import MatchmakingService from "../services/matchmakingService";

interface MatchmakingState {
  recommendations: Recommendation[];
  currentPage: number;
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

interface MatchmakingStore extends MatchmakingState {
  getRecommendations: (limit?: number, page?: number) => Promise<void>;
  getRecommendationsByFilters: (filters: {
    minAge?: number;
    maxAge?: number;
    gender?: "male" | "female" | "both";
    maxDistance?: number;
    interests?: string[];
  }) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
  clearRecommendations: () => void;
}

export const useMatchmakingStore = create<MatchmakingStore>((set, get) => ({
  recommendations: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,

  getRecommendations: async (limit = 10, page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MatchmakingService.getRecommendations(limit, page);
      set({
        recommendations:
          page === 1
            ? response.recommendations
            : [...get().recommendations, ...response.recommendations],
        currentPage: response.current_page,
        totalPages: response.last_page,
        total: response.total,
        hasMore: response.current_page < response.last_page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to get recommendations",
      });
    }
  },

  getRecommendationsByFilters: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MatchmakingService.getRecommendationsByFilters(
        filters
      );
      set({
        recommendations: response.recommendations,
        currentPage: response.current_page,
        totalPages: response.last_page,
        total: response.total,
        hasMore: response.current_page < response.last_page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to get recommendations",
      });
    }
  },

  loadMore: async () => {
    const { currentPage, hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;

    const nextPage = currentPage + 1;
    await get().getRecommendations(10, nextPage);
  },

  refresh: async () => {
    await get().getRecommendations(10, 1);
  },

  clearError: () => {
    set({ error: null });
  },

  clearRecommendations: () => {
    set({
      recommendations: [],
      currentPage: 1,
      totalPages: 1,
      total: 0,
      hasMore: true,
    });
  },
}));

export default useMatchmakingStore;
