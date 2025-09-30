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
export const createConversation = async (title) => {
    return prisma.conversation.create({
        data: { title: title ?? 'New conversation' },
    });
};
export const getConversationById = async (id) => {
    return prisma.conversation.findUnique({ where: { id } });
};
export const appendMessage = async (id, role, content) => {
    const newMsg = [
        { role, content, createdAt: new Date().toISOString() },
    ];
    const payload = JSON.stringify(newMsg);
    await prisma.$executeRawUnsafe(`
    UPDATE "Conversation"
    SET messages = COALESCE(messages, '[]'::jsonb) || $1::jsonb,
        "messageCount" = COALESCE(jsonb_array_length(messages), 0) + 1,
        "lastMessage" = ($1::jsonb)->0->>'content',
        "updatedAt" = now()
    WHERE id = $2
    `, payload, id);
    return prisma.conversation.findUnique({ where: { id } });
};
export const renameConversation = async (id, title) => {
    return prisma.conversation.update({ where: { id }, data: { title } });
};
export const deleteConversation = async (id) => {
    await prisma.conversation.delete({ where: { id } });
};
