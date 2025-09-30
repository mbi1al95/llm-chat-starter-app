import type { Conversation, ConversationList } from "@/types/conversation";

// Fetch all conversations from backend
export const fetchConversations = async (): Promise<ConversationList[]> => {
  try {
    const res = await fetch("/api/conversations");
    if (!res.ok) {
      throw new Error("Failed to fetch conversations");
    }
    const data: ConversationList[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

// Fetch single conversation by id
export const fetchConversationById = async (id: string): Promise<Conversation | null> => {
  try {
    const res = await fetch(`/api/conversations/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch conversation");
    }
    const data: Conversation = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return null;
  }
};