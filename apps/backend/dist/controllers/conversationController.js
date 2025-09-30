import * as service from '../services/conversationService.js';
export const listConversations = async (c) => {
    const convs = await service.listConversations();
    return c.json(convs);
};
export const createConversation = async (c) => {
    const { title } = await c.req.json();
    const conv = await service.createConversation(title);
    return c.json(conv);
};
export const getConversation = async (c) => {
    const id = c.req.param('id');
    const conv = await service.getConversationById(id);
    if (!conv)
        return c.json({ error: 'Not found' }, 404);
    return c.json(conv);
};
export const appendMessage = async (c) => {
    const id = c.req.param('id');
    const { role, content } = await c.req.json();
    const conv = await service.appendMessage(id, role, content);
    return c.json(conv);
};
export const renameConversation = async (c) => {
    const id = c.req.param('id');
    const { title } = await c.req.json();
    const conv = await service.renameConversation(id, title);
    return c.json(conv);
};
export const deleteConversation = async (c) => {
    const id = c.req.param('id');
    await service.deleteConversation(id);
    return c.json({ ok: true });
};
