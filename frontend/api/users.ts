import axios from "axios";

export const createUser = async ({ email }: { email: string }) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/user`, {
      email,
    });

    if (data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
