const convict = require("convict");
const { url } = require("convict-format-with-validator");

const schema = {
  app: {
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 3000,
      env: "PORT"
    }
  },
  node_env: {
    doc: "The application environment.",
    format: ["dev", "prod", "test"],
    default: "dev",
    env: "NODE_ENV"
  },
  db: {
    url: {
      default: "mongodb://localhost/sampleDb",
      env: "DB_URL"
    },
    user: {
      default: "user not set",
      env: "DB_USER"
    },
    password: {
      default: "password not set",
      env: "DB_PASSWORD"
    }
  }
};

convict.addFormat(url);

const config = convict(schema).validate({ allowed: "strict" });

module.exports = { config };
