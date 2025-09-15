import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['admin', 'user']).default('user'),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const inferenceRequestSchema = z.object({
  model: z.string().min(1, 'Model is required'),
  prompt: z.string().min(1, 'Prompt is required'),
  maxTokens: z.number().min(1).max(4000).default(100),
  temperature: z.number().min(0).max(2).default(0.7),
  stream: z.boolean().default(false),
})

export const inferenceResponseSchema = z.object({
  id: z.string(),
  response: z.string(),
  tokensUsed: z.number(),
  latencyMs: z.number(),
  model: z.string(),
  timestamp: z.date(),
})

export type User = z.infer<typeof userSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type InferenceRequest = z.infer<typeof inferenceRequestSchema>
export type InferenceResponse = z.infer<typeof inferenceResponseSchema>