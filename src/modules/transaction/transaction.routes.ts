import { isAuthenticated } from '@/middleware/auth.middleware';
import { Router } from 'express';
import * as transactionController from './transaction.controller';

const router = Router();

router.get(
  '/transactions/all',
  isAuthenticated,
  transactionController.getAllTransactions
);
router.get(
  '/transactions/my',
  isAuthenticated,
  transactionController.getAllTransactionsByUserUid
);
router.get(
  '/transactions/info/:transactionUid',
  isAuthenticated,
  transactionController.getTransactionByUid
);

router.post(
  '/transaction/make',
  isAuthenticated,
  transactionController.createTransaction
);

export default router;
