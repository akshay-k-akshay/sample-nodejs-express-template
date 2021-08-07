const { app } = require("./app");
const { logger } = require("./config");
const { config } = require("./config");

const port = config.get("app.port");

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});
