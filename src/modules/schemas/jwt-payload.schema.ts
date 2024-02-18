import { z } from 'zod';

const JwtPayload = z.object({
  sub: z.string(),
  iat: z.number().int(),
  exp: z.number().int(),
  email: z.string(),
});

type JwtPayload = z.infer<typeof JwtPayload>;

export { JwtPayload };
