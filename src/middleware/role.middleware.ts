import { CustomError } from '@/utils/custom_error';
import { Request, Response, NextFunction } from 'express';
import token from '@/modules/auth/lib/token';
import { refresh } from '@/modules/auth/auth.service';
import { extractAccessTokenFromCookie } from './lib/extractAccessTokenFromCookie';
import { extractRefreshTokenFromCookie } from './lib/extractRefreshTokenFromCookie';
import { RoleEnum } from '@/db/drizzle/schema/user/enums/role.enum';
import { HttpStatus } from '@/utils/enums/http-status';
import { logger } from '@/lib/loger';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user.role != RoleEnum.ADMIN) {
      return next(new CustomError(HttpStatus.FORBIDDEN, 'For admins only'));
    }
    return next();
  } catch (error) {
    logger.error(error);
    next(new CustomError(HttpStatus.FORBIDDEN, 'For admins only'));
  }
}
