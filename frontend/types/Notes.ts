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

export type APIResponseNoteList = APIResponse<Note[]>;

export type APIResponseNoteDelete = APIResponse<Record<string, never>>;

export type APIResponseNoteUpdate = APIResponse<Note>;
