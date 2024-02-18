import { z } from 'zod';

const RegistrationFormSchema = z
  .object({
    email: z.string().email().max(255),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
    firstName: z.string().max(255),
    lastName: z.string().max(255),
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
