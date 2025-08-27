import { create } from "zustand";
import { Like, LikeResponse } from "../../../types/likes";
import LikesService from "../services/likesService";

interface LikesState {
  likes: Like[];
  likedUserIds: number[];
  isLoading: boolean;
  error: string | null;
  getLikes: (page: number) => Promise<void>;
  likeUser: (userId: number) => Promise<LikeResponse>;
  unlikeUser: (userId: number) => Promise<void>;
  refresh: () => void;
  clearError: () => void;
}

export const useLikesStore = create<LikesState>((set, get) => ({
  likes: [],
  likedUserIds: [],
  isLoading: false,
  error: null,

  getLikes: async (page: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await LikesService.getLikes(page);
      set({
        likes: response.data,
        likedUserIds: response.data.map((like: Like) => like.liked_user_id),
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to load likes",
      });
      throw error;
    }
  },

  likeUser: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Liking user with ID:", userId);
      console.log("Current user state:", get());

      // Validate userId
      if (!userId || userId <= 0) {
        throw new Error("Invalid user ID provided");
      }

      const response = await LikesService.likeUser(userId);
      console.log("Like response:", response);
      set({
        likedUserIds: [...get().likedUserIds, userId],
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error: any) {
      console.error("Error liking user:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);

      // Don't treat "already liked" as an error state
      if (
        error.response?.data?.message === "Already liked this user" ||
        error.response?.data?.message === "Already liked this profile"
      ) {
        set({
          isLoading: false,
          error: null,
        });
        // Return a mock response for already liked case
        return {
          is_match: false,
          message: error.response?.data?.message || "Already liked this user",
        };
      }

      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to like user",
      });
      throw error;
    }
  },

  unlikeUser: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Unliking user with ID:", userId);
      await LikesService.unlikeUser(userId);
      console.log("User unliked successfully");
      set({
        likedUserIds: get().likedUserIds.filter((id) => id !== userId),
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error("Error unliking user:", error);
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to unlike user",
      });
      throw error;
    }
  },

  refresh: () => {
    const { getLikes } = get();
    getLikes(1);
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useLikesStore;
