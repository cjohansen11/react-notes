import {
  APIReponseNoteCreate,
  APIResponseNoteDelete,
  APIResponseNoteList,
  APIResponseNoteUpdate,
} from "@/types";

import axios from "axios";

export const createNote = async ({
  note,
  email,
}: {
  note: { note: string; title?: string };
  email: string;
}) => {
  try {
    const { data } = await axios.post<APIReponseNoteCreate>(
      `${process.env.NEXT_PUBLIC_API}/note`,
      { note, email }
    );

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const listNotes = async ({
  userId,
  query,
  orderBy,
}: {
  userId: string;
  query?: string;
  orderBy?: "newest" | "oldest" | "recentlyUpdated";
}) => {
  try {
    const { data } = await axios.get<APIResponseNoteList>(
      `${process.env.NEXT_PUBLIC_API}/note/list/${userId}`,
      {
        params: {
          query,
          orderBy,
        },
      }
    );

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteNote = async ({ noteId }: { noteId: string }) => {
  try {
    const { data } = await axios.delete<APIResponseNoteDelete>(
      `${process.env.NEXT_PUBLIC_API}/note/${noteId}`
    );

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateNote = async ({
  noteId,
  note,
  title,
}: {
  noteId: string;
  title?: string;
  note?: string;
}) => {
  try {
    const { data } = await axios.put<APIResponseNoteUpdate>(
      `${process.env.NEXT_PUBLIC_API}/note/${noteId}`,
      {
        note,
        title,
      }
    );

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
