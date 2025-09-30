import { stream } from "hono/streaming";
import * as service from "../services/chatService.js";
export const handleChat = async (c) => {
    try {
        const { messages, conversationId } = await c.req.json();
        return stream(c, async (sse) => {
            await service.streamChatCompletion(messages, sse, conversationId);
        });
    }
    catch (error) {
        console.error("Error:", error);
        return c.json({ error: "Failed to process request" }, 500);
    }
};
