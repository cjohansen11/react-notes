import express, { Response, Request } from "express";

const healthRouter = express.Router();

const getHealth = (_req: Request, res: Response) => {
  res.status(200).send({ status: "success", message: "Server is healthy" });
};

healthRouter.get("/health", getHealth);

export default healthRouter;
