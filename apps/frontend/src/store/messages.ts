import { create } from "zustand";

import type { Message } from "@/types/chat";

interface MessagesState {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  clearMessages: () => void;
  setMessages: (messages: Message[]) => void;
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
}

export const useMessages = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessage: (content) =>
    set((state) => ({
      messages: state.messages.map((msg, idx) =>
        idx === state.messages.length - 1
          ? { ...msg, content: msg.content + content }
          : msg,
      ),
    })),
  clearMessages: () => set({ messages: [] }),
  setMessages: (messages) => set({ messages }),
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
}));
