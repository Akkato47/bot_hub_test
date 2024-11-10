import { CorsOptions } from 'cors';
import { env } from './env';

const isProduction = env.NODE_ENV === 'prod';

export default {
  app: {
    isProduction,
    port: env.PORT || 8080,
  },
  cors: {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
    credentials: true,
  } as CorsOptions,
  database: {
    postgres: {
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      url: env.DATABASE_URL,
    },
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
    },
  },
  jwt: {
    access: {
      secret: env.JWT_ACCESS_SECRET,
      expiresIn: isProduction ? env.ACCESS_TOKEN_EXPIRES_IN : '5m',
    },
    refresh: {
      secret: env.JWT_REFRESH_SECRET,
      expiresIn: isProduction ? env.REFRESH_TOKEN_EXPIRES_IN : '12h',
    },
  },
} as const;
