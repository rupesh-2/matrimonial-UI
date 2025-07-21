export interface Profile {
  id: number;
  user_id: number;
  bio: string;
  age: number;
  gender: "male" | "female" | "other";
  location: string;
  photos: string[];
  interests: string[];
  height?: number;
  occupation?: string;
  education?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfilePreferences {
  id: number;
  user_id: number;
  min_age: number;
  max_age: number;
  preferred_gender: "male" | "female" | "both";
  max_distance: number;
  show_online_only: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  bio?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  location?: string;
  photos?: string[];
  interests?: string[];
  height?: number;
  occupation?: string;
  education?: string;
}

export interface UpdatePreferencesData {
  min_age?: number;
  max_age?: number;
  preferred_gender?: "male" | "female" | "both";
  max_distance?: number;
  show_online_only?: boolean;
}
