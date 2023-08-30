import { APIResponse } from "./APIResponse";

export type User = { id: string; email: string };

export type APIResponseUserCreate = APIResponse<User>;

export type APIResponseUserRead = APIResponse<User>;
