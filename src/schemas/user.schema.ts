import z from "zod";

export const categories = {
  teamoadj: "teamoadj",
  company: "company",
  school: "school",
  user: "user",
} as const;

export const UserSchema = z.object({
  username: z.string(),
  name: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
  isActive: z.boolean().default(true),
  category: z.enum([
    categories.teamoadj,
    categories.company,
    categories.school,
    categories.user,
  ]),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validatePartialUser = (user: UserSchemaType) => {
  return UserSchema.partial().safeParse(user);
};

export type UserSchemaType = z.infer<typeof UserSchema>;
