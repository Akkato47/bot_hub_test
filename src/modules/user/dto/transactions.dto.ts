import { InsertTransaction } from '@/db/drizzle/schema/transaction/schema';
import { TransactionEnum } from '@/db/drizzle/schema/user/enums/transaction.enum';

export class CreateTransactionDto implements InsertTransaction {
  userUid!: string;
  amount!: number;
  type!: TransactionEnum;
  description: string;
}
