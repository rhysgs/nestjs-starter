import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const AuthConfig = z.object({
  SESSION_SECRET: z.string(),
  SESSION_TTL: z.coerce.number().int().positive(),
  SESSION_REFRESH_TRESHOLD: z.coerce.number().int().positive(),
});

export type AuthConfig = z.infer<typeof AuthConfig>;

export default registerAs('authConfig', () => AuthConfig.parse(process.env));
