import { create } from "zustand";
import { Match } from "../../../types/matches";
import MatchesService from "../services/matchesService";

interface MatchesState {
  matches: Match[];
  currentPage: number;
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

interface MatchesStore extends MatchesState {
  getMatches: (page?: number) => Promise<void>;
  createMatch: (userId: number) => Promise<void>;
  removeMatch: (userId: number) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
  clearMatches: () => void;
}

export const useMatchesStore = create<MatchesStore>((set, get) => ({
  matches: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,

  getMatches: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await MatchesService.getMatches(page);
      set({
        matches:
          page === 1
            ? response.matches
            : [...get().matches, ...response.matches],
        currentPage: response.current_page,
        totalPages: response.last_page,
        total: response.total,
        hasMore: response.current_page < response.last_page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to get matches",
      });
    }
  },

  createMatch: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      await MatchesService.createMatch(userId);
      // Refresh matches after creating a new one
      await get().getMatches(1);
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create match",
      });
      throw error;
    }
  },

  removeMatch: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      await MatchesService.removeMatch(userId);
      // Remove match from local state
      set({
        matches: get().matches.filter(
          (match) => match.matched_user_id !== userId
        ),
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to remove match",
      });
      throw error;
    }
  },

  loadMore: async () => {
    const { currentPage, hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;

    const nextPage = currentPage + 1;
    await get().getMatches(nextPage);
  },

  refresh: async () => {
    await get().getMatches(1);
  },

  clearError: () => {
    set({ error: null });
  },

  clearMatches: () => {
    set({
      matches: [],
      currentPage: 1,
      totalPages: 1,
      total: 0,
      hasMore: true,
    });
  },
}));

export default useMatchesStore;
