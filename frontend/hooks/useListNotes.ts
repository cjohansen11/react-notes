import api from "@/api";
import { Note } from "@/types";
import { UseQueryOptions, useQuery } from "react-query";

export default function useListNotes({
  userId,
  options,
  query,
  orderBy,
}: {
  userId: string;
  query?: string;
  orderBy?: "newest" | "oldest" | "recentlyUpdated";
  options: UseQueryOptions<Note[], unknown, Note[], any>;
}) {
  return useQuery(
    ["list-notes", userId, query, orderBy],
    () => api.notes.listNotes({ userId, query, orderBy }),
    options
  );
}
