import { Context } from 'hono';
import * as service from '../services/conversationService.js';

export const listConversations = async (c: Context) => {
  const convs = await service.listConversations();
  return c.json(convs);
};

export const createConversation = async (c: Context) => {
  const { title } = await c.req.json();
  const conv = await service.createConversation(title);
  return c.json(conv);
};

export const getConversation = async (c: Context) => {
  const id = c.req.param('id');
  const conv = await service.getConversationById(id);
  if (!conv) return c.json({ error: 'Not found' }, 404);
  return c.json(conv);
};
