import { Request, Response, NextFunction } from 'express';
import { CreateModelDto, UpdateModelDto } from './dto/model.dto';
import * as modelService from './model.service';

export async function createModel(
  req: Request<{}, {}, CreateModelDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await modelService.createModel(req.body);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export async function getModels(
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await modelService.getModels();

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export async function getModelByUid(
  req: Request<{ modelUid: string }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await modelService.getModelByUid(req.params.modelUid);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export async function updateModelData(
  req: Request<{}, {}, UpdateModelDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await modelService.updateModelData(req.body);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteModel(
  req: Request<{ modelUid: string }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await modelService.deleteModel(req.params.modelUid);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}
