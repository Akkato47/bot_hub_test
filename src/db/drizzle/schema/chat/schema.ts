import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { users } from '../user/schema';
import { model } from '../model/schema';
import { MessageRoleEnum } from './enum/message-role.enum';

export const statusEnum = pgEnum('status_enum', [
  'ACTIVE',
  'COMPLETED',
  'FAILED',
]);

export const messageRoleEnum = pgEnum('message_role_enum', [
  'user',
  'system',
  'assistant',
]);

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
  role: messageRoleEnum('role').$type<MessageRoleEnum>().notNull(),
  message: text('message').notNull(),
  chatUid: uuid('chat_uid')
    .references(() => chat.uid)
    .notNull(),
  modelUid: uuid('model_uid')
    .references(() => model.uid)
    .notNull(),
  token_used: integer('token_used'),
  creditSpent: integer('credit_spent'),
  sentStatus: boolean('sent_status').$default(() => false),
});

export type InsertMessage = typeof message.$inferInsert;
export type SelectMessage = typeof message.$inferSelect;
