import OpenAI from "openai";
import { createChatCompletion, createChatCompletionStream } from "../provider/openaiProvider.js";
import { streamSSE } from "hono/streaming";
import { StreamingApi } from "hono/utils/stream";

// Get title from OpenAI
export async function generateConversationTitle(firstMessage: string): Promise<string> {
  const prompt = `Generate a short, descriptive title for this conversation in 3-5 words:\n\n"${firstMessage}"`;
  const response = await createChatCompletion(
    [{ role: "user", content: prompt }],
  );
  const title = response.choices[0]?.message?.content?.trim() || "New Conversation";
  return title;
}

export async function streamAssistantResponse(
  messages: OpenAI.ChatCompletionMessageParam[],
  stream: any,
  onDelta?: (delta: string) => void
) {
  const aiStream = await createChatCompletionStream(messages);
  for await (const chunk of aiStream) {
    const content = chunk.choices[0]?.delta?.content || "";
    if (content) {
      // write chunk to SSE
      await stream.writeSSE({
        data: JSON.stringify({ content }),
      });
      // call callback if provided
      onDelta?.(content);
    }
  }
}
