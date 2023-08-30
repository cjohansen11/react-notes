import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
