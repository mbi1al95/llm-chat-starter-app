import OpenAI from "openai";
import { OpenAIConfig } from '../config/index.js';
const openaiProvider = new OpenAI({
    apiKey: OpenAIConfig.OPENAI_API_KEY,
    baseURL: OpenAIConfig.MODEL_BASE_URL,
});
// export const openaiProvider = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
export async function createChatCompletionStream(messages, options) {
    const response = await openaiProvider.chat.completions.create({
        model: options?.model || "gpt-4o-mini",
        messages,
        temperature: options?.temperature ?? 0.7,
        stream: true
    });
    return response;
}
export async function createChatCompletion(messages, options) {
    const response = await openaiProvider.chat.completions.create({
        model: options?.model || "gpt-4o-mini",
        messages,
        temperature: options?.temperature ?? 0.7,
    });
    return response;
}
