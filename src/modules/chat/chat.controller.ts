import { Request, Response, NextFunction } from 'express';

import { CreateMessageDto } from './dto/message.dto';
import * as chatSseService from './chat-sse.service';

export async function setChatSSE(
  req: Request<{ chatUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await chatSseService.settingChatSSE(req, res);
    return result;
  } catch (error) {
    next(error);
  }
}

export async function setChatListSSE(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await chatSseService.settingChatListSSE(req, res);
    return result;
  } catch (error) {
    next(error);
  }
}

export async function sendMessage(
  req: Request<{}, {}, CreateMessageDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await chatSseService.chatSseService.sendMessage(req.body);
    res.send(result).status(200);
  } catch (error) {
    next(error);
  }
}

export async function createChat(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await chatSseService.chatSseService.createChat(req.user.uid);
    res.send(result).status(200);
  } catch (error) {
    next(error);
  }
}
