import {
  date,
  json,
  pgEnum,
  pgTable,
  text,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';

export const users = pgTable(
  'users',
  {
    ...baseSchema,
    firstName: text('first_name').notNull(),
    secondName: text('second_name').notNull(),
    mail: text('email').notNull().unique(),
    password: text('password').notNull(),
    phone: text('phone'),
    birthDate: date('birth_date'),
  },
  (table) => {
    return {
      usersMailUnique: unique('users_mail_unique').on(table.mail),
      usersPhoneUnique: unique('users_phone_unique').on(table.phone),
    };
  }
);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const userProfleInfo = pgTable('user_profle_info', {
  ...baseSchema,
  userUid: uuid('user_uid').references(() => users.uid),
});
