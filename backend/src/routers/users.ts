import express, { Request, Response } from "express";
import { getErrorMessage } from "../utils";
import * as usersController from "../controllers/usersController";

const usersRouter = express.Router();

const createUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    { name: string; email: string }
  >,
  res: Response
) => {
  try {
    const { name, email } = req.body;

    const user = await usersController.createUser({ name, email });

    res.status(201).send({
      status: "success",
      message: "Successfully created new user",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: `Failed to create user. Error: ${getErrorMessage(error)}`,
    });
  }
};

usersRouter.post("/user", createUser);

export default usersRouter;
