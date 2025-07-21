export interface Like {
  id: number;
  user_id: number;
  liked_user_id: number;
  liked_user: UserProfile;
  created_at: string;
  updated_at: string;
}

export interface LikeResponse {
  likes: Like[];
  total: number;
  current_page: number;
  last_page: number;
}

export interface LikeActionResponse {
  message: string;
  is_match?: boolean;
  matched_user?: UserProfile;
}
