import { Router } from 'express';
import * as userController from './user.controller';
import { isAuthenticated } from '@/middleware/auth.middleware';
const router = Router();

router.get('/profile', isAuthenticated, userController.getUserProfile);
router.get('/transactions/all', isAuthenticated, userController.getUserProfile);
router.get('/transactions/my', isAuthenticated, userController.getUserProfile);
router.get(
  '/transactions/info/:transactionUid',
  isAuthenticated,
  userController.getUserProfile
);

router.post(
  '/transaction/make',
  isAuthenticated,
  userController.createTransaction
);

export default router;
