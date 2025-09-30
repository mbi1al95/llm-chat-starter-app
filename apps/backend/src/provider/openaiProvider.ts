import { OpenAI } from "openai";
import {OpenAIConfig} from '../config/index.js'



export const openaiProvider = new OpenAI({
  apiKey: OpenAIConfig.OPENAI_API_KEY,
});

export async function createChatCompletionStream(messages:  OpenAI.ChatCompletionMessageParam[], options?: { model?: string; temperature?: number; }) {
  const response = await openaiProvider.chat.completions.create({
    model: options?.model || "gpt-4o-mini",
    messages,
    temperature: options?.temperature ?? 0.7,
    stream: true
  });

  return response;
}

export async function createChatCompletion(messages:  OpenAI.ChatCompletionMessageParam[], options?: { model?: string; temperature?: number; max_tokens?: number; streamable?: boolean }) {
  const response = await openaiProvider.chat.completions.create({
    model: options?.model || "gpt-4o-mini",
    messages,
    temperature: options?.temperature ?? 0.7,
  });

  return response;
}
