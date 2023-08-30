import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const SearchFormSchema = z.object({
  query: z.string().optional(),
  sort: z
    .nativeEnum({
      newest: "Newest",
      oldest: "Oldest",
      updated: "Recently Updated",
    })
    .optional(),
});

export type SearchFormType = z.infer<typeof SearchFormSchema>;
