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
      const response = await LikesService.likeUser(userId);
      set({
        likedUserIds: [...get().likedUserIds, userId],
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error: any) {
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
      await LikesService.unlikeUser(userId);
      set({
        likedUserIds: get().likedUserIds.filter((id) => id !== userId),
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
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
