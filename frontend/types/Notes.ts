import { APIResponse } from "./APIResponse";

export type Note = {
  id: string;
  title: string | null;
  note: string;
  userId: string;
  createDate: string;
  updateDate: string;
};

export type APIReponseNoteCreate = APIResponse<Note>;
