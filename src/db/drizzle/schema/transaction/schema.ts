import { pgEnum, pgTable, real, uuid, varchar } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { TransactionEnum } from '../user/enums/transaction.enum';
import { users } from '../user/schema';

export const transactionEnum = pgEnum('transaction_enum', [
  'PURCHASE',
  'GENERATION_COST',
]);

export const transaction = pgTable('transactions', {
  ...baseSchema,
  userUid: uuid('user_uid').references(() => users.uid),
  amount: real('amount').notNull(),
  type: transactionEnum('type').$type<TransactionEnum>().notNull(),
  description: varchar('description', { length: 255 }).notNull(),
});

export type InsertTransaction = typeof transaction.$inferInsert;
export type SelectTransaction = typeof transaction.$inferSelect;
