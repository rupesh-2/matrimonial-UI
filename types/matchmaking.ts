export interface Recommendation {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
  location: string;
  distance: number;
  occupation?: string;
  photos: string[];
  compatibility_score: number;
  bio?: string;
  interests?: string[];
  created_at: string;
  updated_at: string;
}

export interface RecommendationResponse {
  data: Recommendation[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}
