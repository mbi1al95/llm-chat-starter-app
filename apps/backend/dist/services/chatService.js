import { prisma } from "../models/prismaClient.js";
import { generateConversationTitle, streamAssistantResponse } from "./openaiService.js";
export const streamChatCompletion = async (messages, stream, conversationId) => {
    let conversation;
    if (conversationId) {
        conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
    }
    if (!conversation) {
        const firstMessageContent = messages[messages.length - 1]?.content || "New Conversation";
        const title = await generateConversationTitle(firstMessageContent);
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
            messages: { push: [...messages] },
            messageCount: conversation.messageCount + messages.length,
            lastMessage: messages[messages.length - 1]?.content || conversation.lastMessage,
        },
    });
    // var for buffering response
    let assistantReply = "";
    // get ai response
    await streamAssistantResponse(messages, stream, (delta) => {
        assistantReply += delta;
    });
    // save promp response
    if (assistantReply.trim().length > 0) {
        await prisma.conversation.update({
            where: { id: conversationId },
            data: {
                messages: {
                    push: { role: "assistant", content: assistantReply },
                },
                messageCount: {
                    increment: 1,
                },
                lastMessage: assistantReply,
            },
        });
    }
    return conversationId;
};
