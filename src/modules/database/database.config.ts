import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const DatabaseConfig = z.object({
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.coerce.number(),
  DB_POOL_SIZE: z.coerce.number().default(10),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfig>;

export default registerAs('databaseConfig', () =>
  DatabaseConfig.parse(process.env),
);
