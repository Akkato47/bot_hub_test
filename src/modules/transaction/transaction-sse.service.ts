import { Request, Response } from 'express';
import EventEmitter from 'events';
import { logger } from '@/lib/loger';
import { CreateTransactionDto } from './dto/transactions.dto';
import { createTransaction, getBalanceByUserUid } from './transaction.service';

class TransactionSseService extends EventEmitter {
  public async makeTransaction(dto: CreateTransactionDto) {
    try {
      const response = await createTransaction(dto);
      this.emit('new_transaction', response);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const transactionSseService = new TransactionSseService();

export const settingBalanceSSE = async (req: Request, res: Response) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const currentBalance = await getBalanceByUserUid(req.user.uid);
    res.write(`data: ${JSON.stringify(currentBalance)}\n\n`);

    const sendSseMessage = (event: string, data: any) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    req.on('close', () => {
      transactionSseService.off('new_transaction', () => {});
      res.end();
    });

    transactionSseService.on(
      'new_transaction',
      (message: { newBalance: number; transactionUid: string }) => {
        sendSseMessage('new_transaction', message);
      }
    );
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
