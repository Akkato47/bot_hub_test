import { Router } from 'express';

import userRouter from './user/user.routes';
import authRouter from './auth/auth.routes';
import chatRouter from './chat/chat.routes';
import modelRouter from './model/model.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/chat', chatRouter);
router.use('/model', modelRouter);

export default router;
