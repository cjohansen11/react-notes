import express from "express";
import morgan from "morgan";
import cors from "cors";
import initializeRoutes from "./routers";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

initializeRoutes(app);

app.listen(3001, () => {
  console.log(`listening on port 3001`);
});
