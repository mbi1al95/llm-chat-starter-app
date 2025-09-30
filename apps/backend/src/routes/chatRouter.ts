import { Hono } from 'hono';
import * as controller from '../controllers/chatController.js';
import { validate } from '../middlewares/validate.js';
import { chatRequestSchema} from '../utils/validators/index.js';

const chatRouter = new Hono();

chatRouter.post('/', validate(chatRequestSchema), controller.handleChat);

export default chatRouter;
