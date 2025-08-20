export interface Recommendation {
  compatibility_percentage: number;
  score: number;
  user: {
    id: number;
    name: string;
    age: number;
    gender: "male" | "female";
    location: string;
    distance: number;
    occupation?: string;
    photos: string[];
    bio?: string;
    interests?: string[];
    created_at: string;
    updated_at: string;
  };
}

export interface RecommendationResponse {
  data: Recommendation[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}
