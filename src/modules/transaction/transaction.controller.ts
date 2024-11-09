import { Request, Response, NextFunction } from 'express';

import * as transactionService from './transaction.service';
import { CreateTransactionDto } from '../user/dto/transactions.dto';

export async function getAllTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await transactionService.getAllTransactions();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAllTransactionsByUserUid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await transactionService.getAllTransactionsByUserUid(
      req.user.uid
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTransactionByUid(
  req: Request<{ transactionUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await transactionService.getAllTransactionsByUserUid(
      req.params.transactionUid
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createTransaction(
  req: Request<{}, {}, CreateTransactionDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await transactionService.createTransaction(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
