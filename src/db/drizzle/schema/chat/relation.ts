import { relations } from 'drizzle-orm';
import { chat, message } from './schema';
import { users } from '../user/schema';
import { model } from '../model/schema';

export const chatRelations = relations(chat, ({ one, many }) => ({
  user: one(users, {
    fields: [chat.userUid],
    references: [users.uid],
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chatUid],
    references: [chat.uid],
  }),
  model: one(model, {
    fields: [message.modelUid],
    references: [model.uid],
  }),
}));
