import { MutateOptions, useMutation } from "react-query";
import api from "@/api";

export default function useDeleteNote({
  options,
}: {
  options?: MutateOptions<Record<string, never>, unknown, { noteId: string }>;
}) {
  return useMutation(
    "delete-note",
    ({ noteId }) => api.notes.deleteNote({ noteId }),
    options
  );
}
