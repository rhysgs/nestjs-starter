import { z } from 'zod';

const RegistrationFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

type RegistrationFormSchema = z.infer<typeof RegistrationFormSchema>;

export { RegistrationFormSchema };
