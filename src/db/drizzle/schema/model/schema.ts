import { pgTable, integer, varchar, real } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { ChatModel } from 'openai/resources';

export const model = pgTable('model', {
  ...baseSchema,
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  token_cost: real('token_cost')
    .notNull()
    .$defaultFn(() => 0.2),
  api_link: varchar('api_link', { length: 255 }).notNull(),
  auth_token: varchar('auth_token', { length: 255 }),
  type: varchar('type', { length: 64 })
    .$type<ChatModel>()
    .notNull()
    .$default(() => 'gpt-3.5-turbo'),
});

export type InsertModel = typeof model.$inferInsert;
export type SelectModel = typeof model.$inferSelect;
