import { HttpStatus } from '@/utils/enums/http-status';
import { CreateModelDto, UpdateModelDto } from './dto/model.dto';
import { CustomError } from '@/utils/custom_error';
import { db } from '@/db/drizzle/connect';
import { model } from '@/db/drizzle/schema/model/schema';
import { eq, ne } from 'drizzle-orm';
import { logger } from '@/lib/loger';

export const createModel = async (dto: CreateModelDto) => {
  try {
    const newModel = await db.insert(model).values(dto).returning();
    return {
      createdModelUid: newModel[0].uid,
    };
  } catch (error) {
    throw error;
  }
};

export const getAllAvailableModelTypes = async () => {
  try {
    const chatModels = [
      'o1-preview',
      'o1-preview-2024-09-12',
      'o1-mini',
      'o1-mini-2024-09-12',
      'gpt-4o',
      'gpt-4o-2024-08-06',
      'gpt-4o-2024-05-13',
      'gpt-4o-realtime-preview',
      'gpt-4o-realtime-preview-2024-10-01',
      'gpt-4o-audio-preview',
      'gpt-4o-audio-preview-2024-10-01',
      'chatgpt-4o-latest',
      'gpt-4o-mini',
      'gpt-4o-mini-2024-07-18',
      'gpt-4-turbo',
      'gpt-4-turbo-2024-04-09',
      'gpt-4-0125-preview',
      'gpt-4-turbo-preview',
      'gpt-4-1106-preview',
      'gpt-4-vision-preview',
      'gpt-4',
      'gpt-4-0314',
      'gpt-4-0613',
      'gpt-4-32k',
      'gpt-4-32k-0314',
      'gpt-4-32k-0613',
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-16k',
      'gpt-3.5-turbo-0301',
      'gpt-3.5-turbo-0613',
      'gpt-3.5-turbo-1106',
      'gpt-3.5-turbo-0125',
      'gpt-3.5-turbo-16k-0613',
    ];

    return chatModels;
  } catch (error) {
    throw error;
  }
};

export const getModels = async () => {
  try {
    const modelList = await db
      .select({
        uid: model.uid,
        createdAt: model.createdAt,
        name: model.name,
        description: model.description,
        token_cost: model.token_cost,
        type: model.type,
      })
      .from(model);
    return modelList;
  } catch (error) {
    throw error;
  }
};

export const getModelByUid = async (modelUid: string) => {
  try {
    const modelResult = await db
      .select({
        uid: model.uid,
        createdAt: model.createdAt,
        name: model.name,
        description: model.description,
        token_cost: model.token_cost,
        type: model.type,
      })
      .from(model)
      .where(eq(model.uid, modelUid));
    return modelResult[0];
  } catch (error) {
    throw error;
  }
};

export const updateModelData = async (dto: UpdateModelDto) => {
  try {
    const { uid, ...data } = dto;
    await db.update(model).set(data).where(eq(model.uid, uid)).execute();
    return {
      message: 'Model updated',
    };
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (modelUid: string) => {
  try {
    await db.delete(model).where(eq(model.uid, modelUid)).execute();
    return {
      message: 'Model deleted',
    };
  } catch (error) {
    throw error;
  }
};
