import { HttpStatus } from '@/utils/enums/http-status';
import { CreateModelDto, UpdateModelDto } from './dto/model.dto';
import { CustomError } from '@/utils/custom_error';
import { db } from '@/db/drizzle/connect';
import { model } from '@/db/drizzle/schema/model/schema';
import { eq } from 'drizzle-orm';

export const createModel = async (dto: CreateModelDto) => {
  try {
    const newModel = await db.insert(model).values(dto).returning();
    return {
      createdModelUid: newModel[0].uid,
    };
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getModels = async () => {
  try {
    const modelList = await db.select().from(model);
    return modelList;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getModelByUid = async (modelUid: string) => {
  try {
    const modelResult = await db
      .select()
      .from(model)
      .where(eq(model.uid, modelUid));
    return modelResult[0];
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};
