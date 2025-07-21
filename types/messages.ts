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

export interface Conversation {
  id: number;
  other_user: {
    id: number;
    name: string;
    age: number;
    gender: "male" | "female";
    photos: string[];
    is_online: boolean;
  };
  last_message: {
    id: number;
    content: string;
    sender_id: number;
    created_at: string;
    is_read: boolean;
  };
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface SendMessageData {
  receiver_id: number;
  content: string;
  message_type?: "text" | "image" | "audio";
}

export interface MessagesResponse {
  data: Message[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export interface ConversationsResponse {
  data: Conversation[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}
