import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';

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

export type InsertModel = typeof model.$inferInsert;
export type SelectModel = typeof model.$inferSelect;
