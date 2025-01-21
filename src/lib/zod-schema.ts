import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z
	  .string()
	  .min(6, 'Password must be at least 6 characters long')
	  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
	  .regex(/\d/, 'Password must contain at least one number'),
});

export const registerSchema = z.object({
	email: z.string().email('Invalid email address'),
	firstname: z.string().min(1, 'First name is required'),
	middlename: z.string().optional(),
	lastname: z.string().min(1, 'Last name is required'),
	password: z
	  .string()
	  .min(6, 'Password must be at least 6 characters long')
	  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
	  .regex(/\d/, 'Password must contain at least one number'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;