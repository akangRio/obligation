import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import router from "./routes";
import cors from "cors";
import { setupSwagger } from "./config/swagger";
import uploadRoute from "./routes/uploadRoute";
import aiRoute from "./routes/aiRoute";
import errorHandler from "./middleware/errorHandler";
import projectRoute from "./routes/projectRoute";

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
setupSwagger(app);
app.use("/", router);
app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);
app.use("/projects", projectRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`This app listening on http://localhost:${port}/`);
});

export default app;
