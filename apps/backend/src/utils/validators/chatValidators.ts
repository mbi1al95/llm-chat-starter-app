import { z } from "zod";

export const chatRequestSchema = z.object({
  conversationId: z.string().nullable().optional(), // optional conversation ID
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1, "Content cannot be empty"),
      })
    )
    .min(1, "At least one message is required"),
});

export type ChatRequestPayload = z.infer<typeof chatRequestSchema>;
