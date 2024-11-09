import {
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { users } from '../user/schema';

export const statusEnum = pgEnum('status_enum', [
  'ACTIVE',
  'COMPLETED',
  'FAILED',
]);

export const messageRoleEnum = pgEnum('message_role_enum', ['user', 'system']);

export const model = pgTable('model', {
  ...baseSchema,
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  token_cost: integer('token_cost')
    .notNull()
    .$defaultFn(() => 0.2),
  api_link: varchar('api_link', { length: 255 }).notNull(),
  auth_token: varchar('auth_token', { length: 255 }),
});

export const chat = pgTable('chat', {
  ...baseSchema,
  userUid: uuid('user_uid').references(() => users.uid),
  modelUid: uuid('model_uid').references(() => model.uid),
  total_token_used: integer('total_token_used').$default(() => 0),
  total_credit_spent: integer('total_credit_spent').$default(() => 0),
});

export const message = pgTable('message', {
  ...baseSchema,
  role: messageRoleEnum('role').notNull(),
  message: text('message').notNull(),
  chatUid: uuid('chat_uid').references(() => chat.uid),
  session_uid: uuid('session_uid').references(() => generationSession.uid),
});

export const generationSession = pgTable('generation_session', {
  ...baseSchema,
  token_used: integer('token_used').notNull(),
  creditSpent: integer('credit_spent').notNull(),
  status: statusEnum('status').notNull(),
  message_uid: uuid('message_uid').references(() => message.uid),
});
