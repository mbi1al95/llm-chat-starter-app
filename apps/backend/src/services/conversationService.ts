import { prisma } from '../models/prismaClient.js';

export const listConversations = async () => {
  return prisma.conversation.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      lastMessage: true,
      messageCount: true,
    },
  });
};

export const createConversation = async (title?: string) => {
  return prisma.conversation.create({
    data: { title: title ?? 'New conversation' },
  });
};

export const getConversationById = async (id: string) => {
  return prisma.conversation.findUnique({ where: { id } });
};
