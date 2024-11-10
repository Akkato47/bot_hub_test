import { isAuthenticated } from '@/middleware/auth.middleware';
import { Router } from 'express';
import * as transactionController from './transaction.controller';
import { isAdmin } from '@/middleware/role.middleware';

const router = Router();

router.get(
  '/balance-sse',
  isAuthenticated,
  transactionController.setBalanceSSE
);

router.get(
  '/all',
  isAuthenticated,
  isAdmin,
  transactionController.getAllTransactions
);
router.get(
  '/my',
  isAuthenticated,
  transactionController.getAllTransactionsByUserUid
);
router.get(
  '/info/:transactionUid',
  isAuthenticated,
  transactionController.getTransactionByUid
);

router.post(
  '/make',
  isAuthenticated,
  isAdmin,
  transactionController.createTransaction
);
router.post(
  '/my/make',
  isAuthenticated,
  transactionController.createTransaction
);

export default router;
