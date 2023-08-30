import { MutateOptions, useMutation } from "react-query";
import api from "@/api";
import { Note } from "@/types/Notes";

export default function useCreateNote({
  options,
}: {
  options?: MutateOptions<
    Note,
    unknown,
    { note: { note: string; title?: string }; email: string }
  >;
}) {
  return useMutation(
    "create-note",
    ({ note, email }) => api.notes.createNote({ note, email }),
    options
  );
}
