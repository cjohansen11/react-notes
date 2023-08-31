import { Prisma } from "@prisma/client";
import { prisma } from "../utils";

export const createNote = async ({
  note: { note, title },
  email,
}: {
  note: { note: string; title?: string };
  email: string;
}) => {
  const newNote = await prisma.note.create({
    data: { User: { connect: { email } }, title, note },
  });

  return newNote;
};

export const readNote = async ({ noteId }: { noteId: string }) => {
  const note = await prisma.note.findUniqueOrThrow({ where: { id: noteId } });

  return note;
};

export const updateNote = async ({
  note,
  title,
  noteId,
}: {
  noteId: string;
  note?: string;
  title?: string;
}) => {
  const updatedNote = await prisma.note.update({
    where: { id: noteId },
    data: { note, title },
  });

  return updatedNote;
};

export const deleteNote = async ({ noteId }: { noteId: string }) => {
  await prisma.note.delete({ where: { id: noteId } });
};

export const listNotes = async ({
  userId,
  orderBy = "newest",
  query,
}: {
  userId: string;
  query?: string;
  orderBy?: "newest" | "oldest" | "recentlyUpdated";
}) => {
  const getOrderBy = (): Prisma.NoteOrderByWithRelationInput => {
    switch (orderBy) {
      case "oldest":
        return { createDate: "asc" };
      case "recentlyUpdated":
        return { updateDate: "desc" };
      default:
        return { createDate: "desc" };
    }
  };

  const notes = await prisma.note.findMany({
    where: { userId, note: { contains: query, mode: "insensitive" } },
    orderBy: getOrderBy(),
  });

  return notes;
};
