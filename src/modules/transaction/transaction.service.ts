import { db } from '@/db/drizzle/connect';
import { TransactionEnum } from '@/db/drizzle/schema/user/enums/transaction.enum';
import { users } from '@/db/drizzle/schema/user/schema';
import { logger } from '@/lib/loger';
import { eq } from 'drizzle-orm';
import { CreateTransactionDto } from '../user/dto/transactions.dto';
import { transaction } from '@/db/drizzle/schema/transaction/schema';

export const createTransaction = async (dto: CreateTransactionDto) => {
  try {
    const result = await db.transaction(async (tx) => {
      try {
        const transactionResult = await tx
          .insert(transaction)
          .values(dto)
          .returning();
        const user = await db
          .select()
          .from(users)
          .where(eq(users.uid, dto.userUid));
        if (user.length === 0) {
          tx.rollback();
          return null;
        }
        if (dto.type === TransactionEnum.PURCHASE) {
          const newBalance = user[0].balance + dto.amount;
          await db.update(users).set({ balance: newBalance }).execute();
          return {
            newBalance,
            transactionUid: transactionResult[0].uid,
          };
        }
        if (dto.type === TransactionEnum.GENERATION_COST) {
          const newBalance = user[0].balance - dto.amount;
          await db.update(users).set({ balance: newBalance }).execute();
          return {
            newBalance,
            transactionUid: transactionResult[0].uid,
          };
        }
      } catch (error) {
        logger.error;
        tx.rollback();
        return null;
      }
    });

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getAllTransactions = async () => {
  try {
    const data = await db.select().from(transaction);

    return {
      data,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getAllTransactionsByUserUid = async (userUid: string) => {
  try {
    const data = await db
      .select()
      .from(transaction)
      .where(eq(transaction.userUid, userUid));

    return {
      data,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getTransactionsByUid = async (transactionUid: string) => {
  try {
    const data = await db
      .select()
      .from(transaction)
      .where(eq(transaction.uid, transactionUid));

    return {
      data,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getBalanceByUserUid = async (userUid: string) => {
  try {
    const result = await db
      .select({ balance: users.balance })
      .from(users)
      .where(eq(users.uid, userUid));

    return result[0];
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
