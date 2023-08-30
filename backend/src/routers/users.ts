import express, { Request, Response } from "express";
import { getErrorMessage } from "../utils";
import * as usersController from "../controllers/usersController";

const usersRouter = express.Router();

const createUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    { email: string }
  >,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await usersController.createUser({ email });

    res.status(201).send({
      status: "success",
      message: "Successfully created new user",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: `Failed to create user. Error: ${getErrorMessage(error)}`,
    });
  }
};

const readUser = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await usersController.readUser({ userId });

    res.status(200).send({
      status: "success",
      message: "Successfully fetched user data",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: `Unable to fetch user ${userId}` });
  }
};

const deleteUser = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;

  try {
    await usersController.deleteUser({ userId });

    res
      .status(204)
      .send({
        status: "success",
        message: `Successfully deleted user ${userId}`,
      });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: `Failed to delete user ${userId}` });
  }
};

usersRouter.post("/user", createUser);
usersRouter.get("/user/:userId", readUser);
usersRouter.delete("/user/:userId", deleteUser);

export default usersRouter;
