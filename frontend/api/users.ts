import { APIResponseUserCreate, APIResponseUserRead } from "@/types";
import axios from "axios";

export const createUser = async ({ email }: { email: string }) => {
  try {
    const { data } = await axios.post<APIResponseUserCreate>(
      `${process.env.NEXT_PUBLIC_API}/user`,
      {
        email,
      }
    );

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const readUserByEmail = async ({ email }: { email: string }) => {
  try {
    const { data } = await axios.get<APIResponseUserRead>(
      `${process.env.NEXT_PUBLIC_API}/user/${email}`
    );

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
