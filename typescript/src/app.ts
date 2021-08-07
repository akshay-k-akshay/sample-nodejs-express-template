import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { PingPong, Sample } from "./routes";
import { morganOption, dbConfig } from "./config";
import { errorHandler } from "./middlewares";

const app = express();

dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(morgan("combined", morganOption)); // http logging

// routes
app.use("/", PingPong);
app.use("/sample", Sample);

// custom middleware
app.use(errorHandler);

export { app };
