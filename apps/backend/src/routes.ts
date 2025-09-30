import chatRouter from "./routes/chatRouter.js";
import conversationRouter from "./routes/conversationRoutes.js";

import { Hono } from 'hono';

const ApiRouter = new Hono();

ApiRouter.route('/chat', chatRouter);
ApiRouter.route('/conversations', conversationRouter);

export default ApiRouter;