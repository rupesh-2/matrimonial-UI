import { Like } from "@types/likes";
import { create } from "zustand";
import LikesService from "../services/likesService";

interface LikesState {
  likes: Like[];
  currentPage: number;
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  likedUsers: Set<number>; // Track which users are liked
}

interface LikesStore extends LikesState {
  getLikes: (page?: number) => Promise<void>;
  likeUser: (
    userId: number
  ) => Promise<{ isMatch: boolean; matchedUser?: any }>;
  unlikeUser: (userId: number) => Promise<void>;
  checkIfLiked: (userId: number) => Promise<boolean>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
  clearLikes: () => void;
  addLikedUser: (userId: number) => void;
  removeLikedUser: (userId: number) => void;
}

export const useLikesStore = create<LikesStore>((set, get) => ({
  likes: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,
  likedUsers: new Set(),

  getLikes: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await LikesService.getLikes(page);
      const likedUserIds = new Set(
        response.likes.map((like) => like.liked_user_id)
      );

      set({
        likes:
          page === 1 ? response.likes : [...get().likes, ...response.likes],
        currentPage: response.current_page,
        totalPages: response.last_page,
        total: response.total,
        hasMore: response.current_page < response.last_page,
        likedUsers:
          page === 1
            ? likedUserIds
            : new Set([...get().likedUsers, ...likedUserIds]),
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to get likes",
      });
    }
  },

  likeUser: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await LikesService.likeUser(userId);

      // Add to liked users set
      set({
        likedUsers: new Set([...get().likedUsers, userId]),
        isLoading: false,
      });

      return {
        isMatch: response.is_match || false,
        matchedUser: response.matched_user,
      };
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

      // Remove from liked users set
      const newLikedUsers = new Set(get().likedUsers);
      newLikedUsers.delete(userId);

      set({
        likedUsers: newLikedUsers,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to unlike user",
      });
      throw error;
    }
  },

  checkIfLiked: async (userId: number) => {
    try {
      const response = await LikesService.checkIfLiked(userId);
      return response.is_liked;
    } catch (error) {
      return false;
    }
  },

  loadMore: async () => {
    const { currentPage, hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;

    const nextPage = currentPage + 1;
    await get().getLikes(nextPage);
  },

  refresh: async () => {
    await get().getLikes(1);
  },

  clearError: () => {
    set({ error: null });
  },

  clearLikes: () => {
    set({
      likes: [],
      currentPage: 1,
      totalPages: 1,
      total: 0,
      hasMore: true,
      likedUsers: new Set(),
    });
  },

  addLikedUser: (userId: number) => {
    set({
      likedUsers: new Set([...get().likedUsers, userId]),
    });
  },

  removeLikedUser: (userId: number) => {
    const newLikedUsers = new Set(get().likedUsers);
    newLikedUsers.delete(userId);
    set({ likedUsers: newLikedUsers });
  },
}));

export default useLikesStore;
