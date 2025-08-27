export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  message_type: "text" | "image" | "audio";
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

// API Response interfaces to match your Laravel backend
export interface ApiMessage {
  id: number;
  from_user_id: number;
  to_user_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  sender?: any;
  recipient?: any;
}

export interface ChatHistoryResponse {
  messages: ApiMessage[];
  total: number;
}

export interface Conversation {
  user: {
    id: number;
    name: string;
    age: number;
    gender: "male" | "female";
    email: string;
    location: string;
    profile_picture?: string;
    photos?: string[];
    is_online?: boolean;
  };
  last_message: {
    id: number;
    from_user_id: number;
    to_user_id: number;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
  };
  unread_count: number;
}

export interface SendMessageData {
  to_user_id: number;
  message: string;
}

export interface MessagesResponse {
  data: Message[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  total: number;
}
