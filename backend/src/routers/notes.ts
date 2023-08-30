import express, { Request, Response } from "express";
import * as notesController from "../controllers/notesController";

const notesRouter = express.Router();

const createNote = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    { note: { note: string; title?: string }; userId: string }
  >,
  res: Response
) => {
  try {
    const { note, userId } = req.body;

    const newNote = await notesController.createNote({ note, userId });

    res.status(201).send({
      status: "success",
      message: "Successfully created new note",
      data: newNote,
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Failed to create note" });
  }
};

const readNote = async (req: Request<{ noteId: string }>, res: Response) => {
  const { noteId } = req.params;
  try {
    const note = await notesController.readNote({ noteId });

    res.status(200).send({
      status: "success",
      message: `Successfully fetched note ${noteId}`,
      data: note,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: `Failed to read note ${noteId}` });
  }
};

const updateNote = async (
  req: Request<
    { noteId: string },
    Record<string, unknown>,
    { title?: string; note?: string }
  >,
  res: Response
) => {
  const { noteId } = req.params;
  try {
    const { note, title } = req.body;

    const updatedNote = await notesController.updateNote({
      noteId,
      note,
      title,
    });

    res.status(204).send({
      status: "success",
      message: `Successfully updated note ${noteId}`,
      data: updatedNote,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: `Failed to update note ${noteId}` });
  }
};

const deleteNote = async (req: Request<{ noteId: string }>, res: Response) => {
  const { noteId } = req.params;
  try {
    await notesController.deleteNote({ noteId });

    res.status(204).send({
      status: "success",
      message: `Successfully deleted note ${noteId}`,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: `Failed to delete note ${noteId}` });
  }
};

const listNotes = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;
  try {
    const notes = await notesController.listNotes({ userId });

    res.status(200).send({
      status: "success",
      message: `Successfully fetched all notes for user ${userId}`,
      data: notes,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: `Failed to list notes for user ${userId}`,
    });
  }
};

notesRouter.post("/note", createNote);
notesRouter.get("/note/:noteId", readNote);
notesRouter.put("/note/:noteId", updateNote);
notesRouter.delete("/note/:noteId", deleteNote);
notesRouter.get("/note/list/:userId", listNotes);

export default notesRouter;
