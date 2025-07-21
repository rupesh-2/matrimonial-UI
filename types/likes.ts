export interface Like {
  id: number;
  user_id: number;
  liked_user_id: number;
  created_at: string;
  updated_at: string;
  liked_user: {
    id: number;
    name: string;
    age: number;
    photos: string[];
  };
}

export interface LikeResponse {
  is_match: boolean;
  matched_user?: {
    id: number;
    name: string;
    age: number;
    photos: string[];
  };
  message?: string;
}

export interface LikesResponse {
  data: Like[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export interface LikeActionResponse {
  message: string;
  is_match?: boolean;
  matched_user?: UserProfile;
}
