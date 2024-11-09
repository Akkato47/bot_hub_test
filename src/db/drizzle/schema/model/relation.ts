import { relations } from 'drizzle-orm';
import { model } from './schema';
import { message } from '../chat/schema';

export const modelRelations = relations(model, ({ many }) => ({
  chat: many(message),
}));
