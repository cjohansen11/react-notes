import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
