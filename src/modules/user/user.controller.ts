import { Request, Response, NextFunction } from 'express';

import * as UserService from './user.service';
import { CreateTransactionDto } from './dto/transactions.dto';

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await UserService.getUserProfile(req.user.uid);
    return res.status(200).json(result);
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
    const result = await UserService.getAllTransactions();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAllTransactionsByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await UserService.getAllTransactionsByUserUid(req.user.uid);
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
    const result = await UserService.getAllTransactionsByUserUid(
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
    const result = await UserService.createTransaction(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
