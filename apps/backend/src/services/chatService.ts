import { StreamingApi } from "hono/utils/stream";
import { prisma } from "../models/prismaClient.js";
import { generateConversationTitle, streamAssistantResponse } from "./openaiService.js";


export const streamChatCompletion = async (messages: any, stream: any, conversationId?: string) => {
  
  // handling conversationId
  let conversation;
  if (conversationId) {
    conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  }
  if (!conversation) {
    const firstMessageContent = messages[messages.length - 1]?.content || "New Conversation";
    const title = await generateConversationTitle(firstMessageContent)
    conversation = await prisma.conversation.create({
      data: {
        title,
        messages: [],
        messageCount: 0,
      },
    });
    conversationId = conversation.id;
  }
  // save user query
  await prisma.conversation.update({
  where: { id: conversationId },
  data: {
    messages: messages, // replacing the full array everytime
    messageCount: messages.length,
    lastMessage: messages[messages.length - 1]?.content || null,
  },
});
  // var for buffering response
  let assistantReply = "";
  // get ai response
  await streamAssistantResponse(messages, stream, (delta: string) => {
    assistantReply += delta;
  });
  // save promp response
  if (assistantReply.trim().length > 0) {
    const updatedMessages = [...messages, { role: "assistant", content: assistantReply }];
    await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      messages: updatedMessages,
      messageCount: updatedMessages.length,
      lastMessage: assistantReply,
    },
    });
  }
  // adding additional stream to write conversational Id for UI
  await stream.writeSSE({
    event: "done",
    data: JSON.stringify({
      conversationId,
    }),
  });
  return conversationId;
};
