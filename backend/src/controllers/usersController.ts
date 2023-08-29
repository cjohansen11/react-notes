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

export const readUser = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { notes: true },
  });

  return user;
};
