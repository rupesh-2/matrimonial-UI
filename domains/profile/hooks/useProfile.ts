import {
  Profile,
  ProfilePreferences,
  UpdatePreferencesData,
  UpdateProfileData,
} from "@types/profile";
import { create } from "zustand";
import ProfileService from "../services/profileService";

interface ProfileState {
  profile: Profile | null;
  preferences: ProfilePreferences | null;
  isLoading: boolean;
  error: string | null;
}

interface ProfileStore extends ProfileState {
  getProfile: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  updatePreferences: (data: UpdatePreferencesData) => Promise<void>;
  uploadPhoto: (photoUri: string) => Promise<void>;
  deletePhoto: (photoUrl: string) => Promise<void>;
  clearError: () => void;
  setProfile: (profile: Profile) => void;
  setPreferences: (preferences: ProfilePreferences) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  preferences: null,
  isLoading: false,
  error: null,

  getProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await ProfileService.getProfile();
      set({ profile, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to get profile",
      });
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await ProfileService.updateProfile(data);
      set({ profile, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update profile",
      });
      throw error;
    }
  },

  updatePreferences: async (data: UpdatePreferencesData) => {
    set({ isLoading: true, error: null });
    try {
      const preferences = await ProfileService.updatePreferences(data);
      set({ preferences, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update preferences",
      });
      throw error;
    }
  },

  uploadPhoto: async (photoUri: string) => {
    set({ isLoading: true, error: null });
    try {
      const { photo_url } = await ProfileService.uploadPhoto(photoUri);
      const currentProfile = get().profile;
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            photos: [...currentProfile.photos, photo_url],
          },
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to upload photo",
      });
      throw error;
    }
  },

  deletePhoto: async (photoUrl: string) => {
    set({ isLoading: true, error: null });
    try {
      await ProfileService.deletePhoto(photoUrl);
      const currentProfile = get().profile;
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            photos: currentProfile.photos.filter((photo) => photo !== photoUrl),
          },
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete photo",
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  setProfile: (profile: Profile) => {
    set({ profile });
  },

  setPreferences: (preferences: ProfilePreferences) => {
    set({ preferences });
  },
}));

export default useProfileStore;
