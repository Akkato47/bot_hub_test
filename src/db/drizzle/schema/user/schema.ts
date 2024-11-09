import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  unique,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { RoleEnum } from './enums/role.enum';

export const roleEnum = pgEnum('role_enum', ['USER', 'ADMIN']);

export const users = pgTable(
  'users',
  {
    ...baseSchema,
    firstName: text('first_name').notNull(),
    lastName: text('second_name').notNull(),
    mail: text('email').notNull().unique(),
    password: text('password').notNull(),
    phone: text('phone'),
    role: roleEnum('role').$type<RoleEnum>().default(RoleEnum.USER).notNull(),
    birthDate: date('birth_date'),
    balance: integer('balance')
      .notNull()
      .$default(() => 0),
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
