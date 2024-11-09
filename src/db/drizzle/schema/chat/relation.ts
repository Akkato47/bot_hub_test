import { relations } from 'drizzle-orm';
import { chat, generationSession, message, model } from './schema';
import { users } from '../user/schema';

export const chatRelations = relations(chat, ({ one, many }) => ({
  user: one(users, {
    fields: [chat.userUid],
    references: [users.uid],
  }),
  model: one(model, {
    fields: [chat.modelUid],
    references: [model.uid],
  }),
  messages: many(message),
}));

export const modelRelations = relations(model, ({ many }) => ({
  chat: many(chat),
}));

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chatUid],
    references: [chat.uid],
  }),
  session: one(generationSession, {
    fields: [message.chatUid],
    references: [generationSession.uid],
  }),
}));

export const generationSessionRelations = relations(
  generationSession,
  ({ one }) => ({
    messages: one(message, {
      fields: [generationSession.message_uid],
      references: [message.uid],
    }),
  })
);
