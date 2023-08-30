import { prisma } from "../utils";

export const createNote = async ({
  note: { note, title },
  userId,
}: {
  note: { note: string; title?: string };
  userId: string;
}) => {
  const newNote = await prisma.note.create({ data: { userId, title, note } });

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

export const listNotes = async ({ userId }: { userId: string }) => {
  const notes = await prisma.note.findMany({ where: { userId } });

  return notes;
};
