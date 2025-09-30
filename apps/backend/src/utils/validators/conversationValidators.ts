import { z } from 'zod';

// All conversation schema

export const createConversationSchema = z.object({
  title: z.string().optional(),
});

export const appendMessageSchema = z.object({
  role: z.string().nonempty(),
  content: z.string().nonempty(),
});

export const renameConversationSchema = z.object({
  title: z.string().nonempty(),
});
