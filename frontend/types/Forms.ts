import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const SearchFormSchema = z.object({
  query: z.string().optional(),
  orderBy: z
    .nativeEnum({
      Newest: "Newest",
      Oldest: "Oldest",
      recentlyUpdated: "Recently Updated",
    })
    .optional(),
});

export type SearchFormType = z.infer<typeof SearchFormSchema>;

export const NoteFormSchema = z.object({
  title: z.string().max(50, { message: "Title exceeds 50 character limit" }),
  note: z
    .string()
    .min(20, { message: "Must be atleast 20 characters" })
    .max(300, { message: "Note exceeds 300 character limit" }),
});

export type NoteFormType = z.infer<typeof NoteFormSchema>;
