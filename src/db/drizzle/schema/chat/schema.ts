import { integer, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { users } from '../user/schema';
import { model } from '../model/schema';

export const statusEnum = pgEnum('status_enum', [
  'ACTIVE',
  'COMPLETED',
  'FAILED',
]);

export const messageRoleEnum = pgEnum('message_role_enum', ['user', 'system']);

export const chat = pgTable('chat', {
  ...baseSchema,
  userUid: uuid('user_uid')
    .references(() => users.uid)
    .notNull(),
  total_token_used: integer('total_token_used').$default(() => 0),
  total_credit_spent: integer('total_credit_spent').$default(() => 0),
});

export type InsertChat = typeof chat.$inferInsert;
export type SelectChat = typeof chat.$inferSelect;

export const message = pgTable('message', {
  ...baseSchema,
  role: messageRoleEnum('role').notNull(),
  message: text('message').notNull(),
  chatUid: uuid('chat_uid').references(() => chat.uid),
  session_uid: uuid('session_uid').references(() => generationSession.uid),
  modelUid: uuid('model_uid').references(() => model.uid),
});

export type InsertMessage = typeof message.$inferInsert;
export type SelectMessage = typeof message.$inferSelect;

export const generationSession = pgTable('generation_session', {
  ...baseSchema,
  token_used: integer('token_used').notNull(),
  creditSpent: integer('credit_spent').notNull(),
  status: statusEnum('status').notNull(),
  message_uid: uuid('message_uid').references(() => message.uid),
});

export type InsertGenearationSession = typeof generationSession.$inferInsert;
export type SelectGenearationSession = typeof generationSession.$inferSelect;
