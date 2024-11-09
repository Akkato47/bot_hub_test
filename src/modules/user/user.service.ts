import { eq, or } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import { transaction, users } from '@/db/drizzle/schema/user/schema';
import type { CreateUserDto } from './dto/create-user.dto';
import { CustomError } from '@/utils/custom_error';
import { hash } from 'bcrypt';
import type { LoginUserDto } from '../auth/dto/login.dto';
import { HttpStatus } from '@/utils/enums/http-status';
import { CreateTransactionDto } from './dto/transactions.dto';
import { logger } from '@/lib/loger';
import { TransactionEnum } from '@/db/drizzle/schema/user/enums/transaction.enum';

export const getUserByUID = async (uid: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    return user[0];
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getUserByLoginData = async (loginData: LoginUserDto) => {
  try {
    if (!loginData) {
      throw new CustomError(HttpStatus.BAD_REQUEST);
    }
    const user = await db
      .select()
      .from(users)
      .where(
        or(eq(users.mail, loginData.mail), eq(users.phone, loginData.phone))
      );
    return user[0];
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const createUser = async (createUserDto: CreateUserDto) => {
  try {
    const tryUser = await db
      .select()
      .from(users)
      .where(eq(users.mail, createUserDto.mail));
    if (tryUser.length > 0) {
      throw new CustomError(HttpStatus.CONFLICT);
    }

    const hashPassword = await hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;

    const user = await db
      .insert(users)
      .values({ ...createUserDto, password: hashPassword })
      .returning();
    return user[0];
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getUserProfile = async (userUid: string) => {
  try {
    const data = await db
      .select({
        uid: users.uid,
        firstName: users.firstName,
        secondName: users.lastName,
        mail: users.mail,
        phone: users.phone,
        role: users.role,
        birthDate: users.birthDate,
        balance: users.balance,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (!data[0]) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }

    return data[0];
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

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
            transactionUid: transactionResult[0].uid,
          };
        }
        if (dto.type === TransactionEnum.GENERATION_COST) {
          const newBalance = user[0].balance - dto.amount;
          await db.update(users).set({ balance: newBalance }).execute();
          return {
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
