import type { Message } from "./chat";

export interface ConversationList {
  id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
  updatedAt: Date
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  messageCount: number;
  updatedAt: Date
}