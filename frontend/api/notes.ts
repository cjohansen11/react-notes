import { APIReponseNoteCreate, APIResponseNoteList } from "@/types/Notes";
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

export const listNotes = async ({ userId }: { userId: string }) => {
  try {
    const { data } = await axios.get<APIResponseNoteList>(
      `${process.env.NEXT_PUBLIC_API}/note/list/${userId}`
    );

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
