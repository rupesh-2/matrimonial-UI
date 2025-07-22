import { API_ENDPOINTS } from "@constants/api";
import apiClient from "@lib/axios";
import {
  Profile,
  ProfilePreferences,
  UpdatePreferencesData,
  UpdateProfileData,
} from "../../../types/profile";

export class ProfileService {
  static async getProfile(): Promise<Profile> {
    const response = await apiClient.get<Profile>(API_ENDPOINTS.PROFILE.GET);
    return response.data;
  }

  static async updateProfile(data: UpdateProfileData): Promise<Profile> {
    const response = await apiClient.put<Profile>(
      API_ENDPOINTS.PROFILE.UPDATE,
      data
    );
    return response.data;
  }

  static async updatePreferences(
    data: UpdatePreferencesData
  ): Promise<ProfilePreferences> {
    const response = await apiClient.post<ProfilePreferences>(
      API_ENDPOINTS.PROFILE.PREFERENCES,
      data
    );
    return response.data;
  }

  static async uploadPhoto(photoUri: string): Promise<{ photo_url: string }> {
    const formData = new FormData();
    formData.append("photo", {
      uri: photoUri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);

    const response = await apiClient.post<{ photo_url: string }>(
      "/api/profile/upload-photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async deletePhoto(photoUrl: string): Promise<void> {
    await apiClient.delete("/api/profile/delete-photo", {
      data: { photo_url: photoUrl },
    });
  }
}

export default ProfileService;
