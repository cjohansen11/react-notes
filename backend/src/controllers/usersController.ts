import { prisma } from "../utils";

export const createUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.create({ data: { email } });

  return user;
};

export const readUserByEmail = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  return user;
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  await prisma.user.delete({ where: { id: userId } });
};
