import z from "zod";

export const UserSchema = z.object({
  username: z.string(),
  name: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UpdateUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
