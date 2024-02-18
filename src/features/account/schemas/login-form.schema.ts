import { z } from 'zod';

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFormSchema = z.infer<typeof LoginFormSchema>;

export { LoginFormSchema };
