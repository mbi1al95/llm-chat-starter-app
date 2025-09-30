import { Hono } from 'hono';
import * as controller from '../controllers/conversationController.js';
import { validate } from '../middlewares/validate.js';
import { createConversationSchema, appendMessageSchema, renameConversationSchema } from '../utils/validators/index.js';

const conversationRouter = new Hono();

conversationRouter.get('/', controller.listConversations);
//conversationRouter.post('/', validate(createConversationSchema), controller.createConversation);
conversationRouter.get('/:id', controller.getConversation);

export default conversationRouter;
