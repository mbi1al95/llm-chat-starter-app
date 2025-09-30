import { Chat } from "@/components/chat/chat";
import { Sidebar } from "./components/chat/side-bar";
import { useState } from "react";
import { useMessages } from "./store/messages";
import { fetchConversationById } from "./api/conversations";

const App = () => {
  const [activeConversationId, setActiveConversationId] = useState<string>();
  const { setMessages, setConversationId } = useMessages();

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id);
    try {
      const data = await fetchConversationById(id);
      if(data){
      setConversationId(id); 
      setMessages(data.messages);
      }
    } catch (err) {
      console.error("Failed to fetch conversation messages", err);
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-background flex items-center justify-center h-14 w-full flex-none">
        <h1 className="text-lg font-semibold">
          LLM Chat{" "}
          <span className="text-sm text-muted-foreground">v1.0</span>
        </h1>
      </header>
      <main className="flex-1 min-h-0 flex">
        <Sidebar
          onSelectConversation={handleSelectConversation}
          activeConversationId={activeConversationId}
        />
        <div className="flex-1 h-full">
          <Chat />
        </div>
      </main>
    </div>
  );
};

export default App;
