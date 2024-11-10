import { db } from '@/db/drizzle/connect';
import { chat, SelectMessage } from '@/db/drizzle/schema/chat/schema';
import { logger } from '@/lib/loger';
import { processMessage, getChats, getMessageHistory } from './chat.service';
import { CreateMessageDto } from './dto/message.dto';
import { Request, Response } from 'express';
import EventEmitter from 'events';

class ChatSseService extends EventEmitter {
  public async sendMessage(dto: CreateMessageDto) {
    try {
      const response = await processMessage(dto);
      this.emit('new_message', response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async createChat(userUid: string) {
    try {
      const newChat = await db
        .insert(chat)
        .values({ userUid: userUid })
        .returning();
      this.emit('new_chat', {
        createdChat: newChat[0].uid,
      });
      return {
        createdChat: newChat[0].uid,
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export const chatSseService = new ChatSseService();

export const settingChatListSSE = async (req: Request, res: Response) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const messageHistory = await getChats(req.user.uid);
    res.write(`data: ${JSON.stringify(messageHistory)}\n\n`);

    const sendSseMessage = (event: string, data: any) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    req.on('close', () => {
      chatSseService.off('new_chat', () => {});
      res.end();
    });

    chatSseService.on('new_chat', (message: { createdChat: string }) => {
      sendSseMessage('new_chat', message);
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const settingChatSSE = async (
  req: Request<{ chatUid: string }>,
  res: Response
) => {
  try {
    const { chatUid } = req.params;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const messageHistory = await getMessageHistory(chatUid);
    res.write(`data: ${JSON.stringify(messageHistory)}\n\n`);

    const sendSseMessage = (event: string, data: any) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    req.on('close', () => {
      console.log('SSE connection closed');
      chatSseService.off('new_chat', () => {});
      res.end();
    });

    chatSseService.on(
      'new_message',
      (message: {
        userMessage: SelectMessage;
        assistantMessage: SelectMessage;
      }) => {
        sendSseMessage('new_message', message);
      }
    );
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
