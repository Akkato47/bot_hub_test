import { MessageRoleEnum } from '@/db/drizzle/schema/chat/enum/message-role.enum';
import { InsertMessage } from '@/db/drizzle/schema/chat/schema';

export class CreateMessageDto implements InsertMessage {
  role: MessageRoleEnum;
  message: string;
  chatUid: string;
  modelUid: string;
}
