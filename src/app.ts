import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import router from "./routes";
import cors from "cors";
import { setupSwagger } from "./config/swagger";

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
setupSwagger(app);
app.use("/", router);

app.listen(port, () => {
  console.log(`This app listening on http://localhost:${port}/`);
});

export default app;
