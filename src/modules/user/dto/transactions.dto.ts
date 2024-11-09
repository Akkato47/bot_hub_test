import { TransactionEnum } from '@/db/drizzle/schema/user/enums/transaction.enum';
import { InsertTransaction } from '@/db/drizzle/schema/user/schema';

export class CreateTransactionDto implements InsertTransaction {
  userUid!: string;
  amount!: number;
  type!: TransactionEnum;
  description: string;
}
