const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { morganOption, dbConfig } = require("./config");
const { PingPong } = require("./routes/ping-pong");
const { Sample } = require("./routes/sample.js");
const { errorHandler } = require("./middlewares");

const app = express();

//db connection
dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(morgan("combined", morganOption));

// routes
app.use("/", PingPong);
app.use("/sample", Sample);

// custom middleware
app.use(errorHandler);

module.exports = { app };
