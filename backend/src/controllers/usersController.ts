import { prisma } from "../utils";

export const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const user = await prisma.user.create({ data: { name, email } });

  return user;
};
