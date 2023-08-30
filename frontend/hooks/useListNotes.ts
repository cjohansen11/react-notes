import api from "@/api";
import { Note } from "@/types/Notes";
import { UseQueryOptions, useQuery } from "react-query";

export default function useListNotes({
  userId,
  options,
}: {
  userId: string;
  options: UseQueryOptions<Note[], unknown, Note[], string[]>;
}) {
  return useQuery(
    ["list-notes", userId],
    () => api.notes.listNotes({ userId }),
    options
  );
}
