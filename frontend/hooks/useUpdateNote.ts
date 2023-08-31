import { MutateOptions, useMutation } from "react-query";
import api from "@/api";
import { Note } from "@/types";

export default function useUpdateNote({
  options,
}: {
  options?: MutateOptions<
    Note,
    unknown,
    { note?: string; title?: string; noteId: string }
  >;
}) {
  return useMutation(
    "update-note",
    ({ noteId, note, title }) => api.notes.updateNote({ noteId, note, title }),
    options
  );
}
