import { relations } from 'drizzle-orm';
import { users } from './schema';
import { chat } from '../chat/schema';
import { transaction } from '../transaction/schema';

export const userRelations = relations(users, ({ many }) => ({
  transaction: many(transaction),
  chat: many(chat),
}));
