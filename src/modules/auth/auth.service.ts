import * as jwtService from './jwt.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import * as userService from '../user/user.service';
import { CustomError } from '@/utils/custom_error';
import { compare } from 'bcrypt';
import { TokenDto } from './dto/create-token.dto';
import { HttpStatus } from '@/utils/enums/http-status';

export const login = async (userData: LoginUserDto) => {
  try {
    const user = await validateUser(userData);
    const payload: TokenDto = {
      uid: user.uid,
    };
    return { ...(await jwtService.createTokenAsync(payload)) };
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const register = async (userData: CreateUserDto) => {
  try {
    const user = await userService.createUser(userData);
    const payload: TokenDto = {
      uid: user.uid,
    };
    return { ...(await jwtService.createTokenAsync(payload)) };
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const logout = async (uid: string) => {
  try {
    await jwtService.removeAllTokensByUid(uid);
    return true;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const refresh = async (refreshToken: string) => {
  try {
    const result = await jwtService.getToken(refreshToken);
    if (!result) {
      throw new CustomError(HttpStatus.UNAUTHORIZED);
    }
    const [userUid] = result[0].split(':');
    const user = await userService.getUserByUID(userUid);
    if (!user) {
      throw new CustomError(HttpStatus.UNAUTHORIZED);
    }
    const tokens = await jwtService.createTokenAsync({
      uid: user.uid,
    });
    await jwtService.removeToken(result[0]);
    return tokens;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

const validateUser = async (userData: LoginUserDto) => {
  try {
    const user = await userService.getUserByLoginData(userData);

    if (!user) {
      throw new CustomError(HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await compare(userData.password, user.password);

    if (user && passwordEquals) {
      const { password, ...result } = user;
      return result;
    }
    throw new CustomError(HttpStatus.BAD_REQUEST);
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};
