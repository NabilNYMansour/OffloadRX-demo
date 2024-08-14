import { z } from 'zod';

export const emailSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().min(2).max(255).email(),
});

export const messageSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().min(2).max(255).email(),
  subject: z.string().min(2).max(255),
  message: z.string().min(2).max(2000),
});