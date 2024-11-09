import { InsertUser } from '@/db/drizzle/schema/user/schema';

export class CreateUserDto implements InsertUser {
  firstName: string;
  lastName: string;
  mail!: string;
  phone!: string | null;
  password!: string;
}

export class UpdateUserDto implements Partial<InsertUser> {
  firstName?: string;
  lastName?: string;
  mail?: string;
  phone?: string | null;
  birthDate?: string;
  password?: string;
}
