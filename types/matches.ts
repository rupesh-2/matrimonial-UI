export interface Match {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  religion?: string;
  caste?: string;
  income?: number;
  education?: string;
  location: string;
  occupation?: string;
  bio?: string;
  profile_picture?: string;
  photos?: string[];
  distance?: number;
  created_at: string;
  updated_at: string;
  preferences?: any;
}

export interface UserProfile {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  bio: string;
  location: string;
  photos: string[];
  interests: string[];
  height?: number;
  occupation?: string;
  education?: string;
  distance?: number;
  is_online?: boolean;
  last_seen?: string;
}

export interface Recommendation {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  bio: string;
  location: string;
  photos: string[];
  interests: string[];
  height?: number;
  occupation?: string;
  education?: string;
  distance: number;
  compatibility_score: number;
  is_online: boolean;
  last_seen: string;
}

export interface MatchResponse {
  matches: Match[];
  total: number;
  current_page: number;
  last_page: number;
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
  total: number;
  current_page: number;
  last_page: number;
}
