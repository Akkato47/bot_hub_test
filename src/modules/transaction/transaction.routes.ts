import { isAuthenticated } from '@/middleware/auth.middleware';
import { Router } from 'express';
import * as transactionController from './transaction.controller';

const router = Router();

router.get(
  '/balance-sse',
  isAuthenticated,
  transactionController.setBalanceSSE
);

router.get('/all', isAuthenticated, transactionController.getAllTransactions);
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

router.post('/make', isAuthenticated, transactionController.createTransaction);

export default router;
