const { connect, connection } = require("mongoose");

const config = require(".");
const { logger } = require("../utils/logger");

// dbUrl and credentials
const dbUrl = config.get("db.url");
const user = config.get("db.user");
const password = config.get("db.password");

// environment
const env = config.get("node_env");

// default params for mongodb
const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// if the environment is production Credentials is using
if (env == "prod") {
  params.auth = { user, password };
}

module.exports = () => {
  connect(`${dbUrl}`, params);

  connection.on("connected", function () {
    logger.info(`DB has been connected to ${dbUrl}`);
  });
};
