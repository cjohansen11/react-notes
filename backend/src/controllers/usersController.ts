import { prisma } from "../utils";

export const createUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.create({ data: { email } });

  return user;
};

export const readUser = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { notes: true },
  });

  return user;
};
