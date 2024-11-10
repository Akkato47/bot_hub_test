import { Router } from 'express';

import * as chatController from './chat.controller';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = Router();

router.get('/sse/:chatUid', isAuthenticated, chatController.setChatSSE);
router.get('/sse', isAuthenticated, chatController.setChatListSSE);

router.post('/message', isAuthenticated, chatController.sendMessage);
router.post('/create', isAuthenticated, chatController.createChat);

export default router;
