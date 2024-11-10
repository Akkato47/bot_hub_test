import { Request, Response, NextFunction } from 'express';

import * as transactionService from './transaction.service';
import { CreateTransactionDto } from '../user/dto/transactions.dto';
import * as transactionSseService from './transaction-sse.service';

export async function setBalanceSSE(
  req: Request<{ chatUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await transactionSseService.settingBalanceSSE(req, res);
    return result;
  } catch (error) {
    next(error);
  }
}

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
    const result =
      await transactionSseService.transactionSseService.makeTransaction(
        req.body
      );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createTransactionToMe(
  req: Request<{}, {}, CreateTransactionDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result =
      await transactionSseService.transactionSseService.makeTransaction({
        ...req.body,
        userUid: req.user.uid,
      });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
