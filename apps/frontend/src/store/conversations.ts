import { fetchConversations } from "@/api/conversations";
import { create } from "zustand";

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
}

interface ConversationState {
  conversations: Conversation[];
  fetchConversations: () => Promise<void>;
  upsertConversation: (conversation: Conversation) => void;
}

export const useConversations = create<ConversationState>((set) => ({
  conversations: [],
  fetchConversations: async () => {
    try {
      const data = await fetchConversations();
      set({ conversations: data });
    } catch (err) {
      console.error("Failed to fetch conversations", err);
    }
  },
  upsertConversation: (conversation) =>
    set((state) => {
      const exists = state.conversations.some(
        (c) => c.id === conversation.id
      );
      return {
        conversations: exists
          ? state.conversations.map((c) =>
              c.id === conversation.id ? { ...c, ...conversation } : c
            )
          : [conversation, ...state.conversations],
      };
    }),
}));
