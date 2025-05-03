import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, 'Password must have at least 6 characters'),
})

export type LoginDto = z.infer<typeof loginSchema>
