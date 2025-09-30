import { useEffect, useState } from "react";
import { useConversations } from "@/store/conversations";

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
}

interface SidebarProps {
  onSelectConversation: (id: string) => void;
  activeConversationId?: string;
}

export const Sidebar = ({ onSelectConversation, activeConversationId }: SidebarProps) => {
  //const [conversations, setConversations] = useState<Conversation[]>([]);
  const { fetchConversations, conversations } = useConversations();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchConversations();
      setLoading(false);
    };
    load();
  }, [fetchConversations]);

  return (
    <div className="w-72 bg-gray-100 border-r overflow-y-auto h-full">
      <h2 className="p-4 font-bold border-b">Conversations</h2>
      {loading ? (
        <p className="p-4 text-gray-500">Loading...</p>
      ) : conversations.length === 0 ? (
        <p className="p-4 text-gray-500">No conversations yet.</p>
      ) : (
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={`p-4 cursor-pointer border-b hover:bg-gray-200 ${
                conv.id === activeConversationId ? "bg-gray-300 font-semibold" : ""
              }`}
              onClick={() => onSelectConversation(conv.id)}
            >
              <p className="truncate">{conv.title}</p>
              <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
