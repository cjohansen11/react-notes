import { Application } from "express";

import healthRouter from "./health";
import usersRouter from "./users";
import notesRouter from "./notes";

export default function initializeRoutes(app: Application) {
  app.use(healthRouter);
  app.use(usersRouter);
  app.use(notesRouter);
}
