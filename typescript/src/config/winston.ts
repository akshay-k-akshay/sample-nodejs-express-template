import { createLogger, format, transports } from "winston";
import { config } from ".";

const options = {
  handleExceptions: true,
  json: true,
  colorize: true
};

const logFormat =
  config.get("node_env") == "prod"
    ? format.combine(format.errors({ stack: true }), format.json())
    : format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.simple()
      );

const logger = createLogger({
  transports: [new transports.Console(options)],
  format: logFormat,
  exitOnError: false
});

const morganOption = {
  stream: {
    write: function (message: string): void {
      logger.info(message);
    }
  }
};

export { logger, morganOption };
