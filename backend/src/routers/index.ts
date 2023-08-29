import { Application } from "express";

import healthRouter from "./health";
import usersRouter from "./users";

export default function initializeRoutes(app: Application) {
  app.use(healthRouter);
  app.use(usersRouter);
}
