export interface Match {
  id: number;
  user_id: number;
  matched_user_id: number;
  matched_user: UserProfile;
  created_at: string;
  updated_at: string;
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
