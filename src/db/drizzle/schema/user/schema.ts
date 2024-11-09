import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { RoleEnum } from './enums/role.enum';
import { TransactionEnum } from './enums/transaction.enum';

export const roleEnum = pgEnum('role_enum', ['USER', 'ADMIN']);
export const transactionEnum = pgEnum('transaction_enum', [
  'PURCHASE',
  'GENERATION_COST',
]);

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
    // bug drizzle(
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

export const transaction = pgTable('transactions', {
  ...baseSchema,
  userUid: uuid('user_uid').references(() => users.uid),
  amount: integer('amount').notNull(),
  type: transactionEnum('type').$type<TransactionEnum>().notNull(),
  description: varchar('description', { length: 255 }).notNull(),
});

export type InsertTransaction = typeof transaction.$inferInsert;
export type SelectTransaction = typeof transaction.$inferSelect;
