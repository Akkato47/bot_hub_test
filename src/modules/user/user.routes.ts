import { Router } from 'express';
import * as userController from './user.controller';
import { isAuthenticated } from '@/middleware/auth.middleware';
const router = Router();

router.get('/profile', isAuthenticated, userController.getUserProfile);

export default router;
