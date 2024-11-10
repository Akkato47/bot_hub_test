import { db } from '@/db/drizzle/connect';
import { chat, message } from '@/db/drizzle/schema/chat/schema';
import { CreateMessageDto } from './dto/message.dto';
import OpenAI from 'openai';
import { model } from '@/db/drizzle/schema/model/schema';
import { eq } from 'drizzle-orm';
import { users } from '@/db/drizzle/schema/user/schema';
import { TransactionEnum } from '@/db/drizzle/schema/user/enums/transaction.enum';
import { MessageRoleEnum } from '@/db/drizzle/schema/chat/enum/message-role.enum';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import { transactionSseService } from '../transaction/transaction-sse.service';

export const getChats = async (userUid: string) => {
  try {
    const chats = await db.select().from(chat).where(eq(chat.userUid, userUid));
    return chats;
  } catch (error) {
    throw error;
  }
};

export const processMessage = async (dto: CreateMessageDto) => {
  try {
    let userMessage = await db.insert(message).values(dto).returning();
    const result = await db.transaction(async (tx) => {
      try {
        const chatResult = await tx
          .select()
          .from(chat)
          .where(eq(chat.uid, dto.chatUid));

        const user = await tx
          .select()
          .from(users)
          .where(eq(users.uid, chatResult[0].userUid));

        if (user[0].balance <= 0) {
          tx.rollback();
        }
        const selectedModel = await tx
          .select()
          .from(model)
          .where(eq(model.uid, dto.modelUid));

        const openAi = new OpenAI({
          baseURL: selectedModel[0].api_link,
          apiKey: selectedModel[0].auth_token,
        });

        const messageResult = await tx
          .select({ role: message.role, content: message.message })
          .from(message)
          .orderBy(message.createdAt)
          .where(eq(message.chatUid, dto.chatUid));

        const answer = await openAi.chat.completions.create({
          messages: [
            { role: 'system', content: 'Answer with only 1 word!' },
            ...messageResult,
            { role: 'user', content: dto.message },
          ],
          model: selectedModel[0].type,
        });

        if (answer.choices[0].finish_reason === 'length') {
          tx.rollback();
        }

        const creditSpent = Number(
          (answer.usage.total_tokens / selectedModel[0].token_cost).toFixed(2)
        );
        await transactionSseService.makeTransaction({
          amount: creditSpent,
          description: 'Model usage',
          type: TransactionEnum.GENERATION_COST,
          userUid: user[0].uid,
        });
        await tx
          .update(chat)
          .set({
            total_token_used:
              chatResult[0].total_token_used + answer.usage.total_tokens,
            total_credit_spent: chatResult[0].total_credit_spent + creditSpent,
          })
          .where(eq(chat.uid, chatResult[0].uid));

        userMessage = await tx
          .update(message)
          .set({
            sentStatus: true,
            creditSpent,
            token_used: answer.usage.total_tokens,
          })
          .where(eq(message.uid, userMessage[0].uid))
          .returning();

        const assistantMessage = await tx
          .insert(message)
          .values({
            chatUid: chatResult[0].uid,
            message: answer.choices[0].message.content,
            modelUid: selectedModel[0].uid,
            role: MessageRoleEnum.ASSISTANT,
          })
          .returning();

        return {
          userMessage: userMessage[0],
          assistantMessage: assistantMessage[0],
        };
      } catch (error) {
        return {
          userMessage: userMessage[0],
        };
      }
    });
    if (!result.assistantMessage) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Not enough credit');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getMessageHistory = async (chatUid: string) => {
  try {
    const result = await db
      .select()
      .from(message)
      .orderBy(message.createdAt)
      .where(eq(message.chatUid, chatUid));

    return result;
  } catch (error) {
    throw error;
  }
};
