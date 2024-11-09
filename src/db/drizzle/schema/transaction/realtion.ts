import { relations } from 'drizzle-orm';
import { transaction } from './schema';
import { users } from '../user/schema';

export const transactionRelations = relations(transaction, ({ one }) => ({
  user: one(users, {
    fields: [transaction.userUid],
    references: [users.uid],
  }),
}));
