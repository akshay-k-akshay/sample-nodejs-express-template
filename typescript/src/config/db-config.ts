import { connect, connection } from "mongoose";

import { config } from "./app-config";
import { logger } from "./winston";

// dbUrl and credentials
const dbUrl = config.get("db.url");
const user = config.get("db.user");
const password = config.get("db.password");

// environment
const env = config.get("node_env");

// default params for mongodb
const params: any = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// if the environment is production Credentials is using
if (env == "prod") {
  params.auth = { user, password };
}

export function dbConfig() {
  connect(dbUrl, params);

  connection.on("connected", function () {
    logger.info(`DB has been connected to ${dbUrl}`);
  });
}
