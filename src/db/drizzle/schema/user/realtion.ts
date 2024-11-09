import { relations } from 'drizzle-orm';
import { transaction, users } from './schema';
import { chat } from '../chat/schema';

export const userRelations = relations(users, ({ many }) => ({
  transaction: many(transaction),
  chat: many(chat),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  user: one(users, {
    fields: [transaction.userUid],
    references: [users.uid],
  }),
}));
