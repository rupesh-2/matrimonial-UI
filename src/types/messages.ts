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
  user_id: number;
  other_user: UserProfile;
  last_message: Message;
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
  messages: Message[];
  total: number;
  current_page: number;
  last_page: number;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  total: number;
  current_page: number;
  last_page: number;
}
