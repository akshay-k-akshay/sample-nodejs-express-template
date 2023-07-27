const { app } = require("./app");
const config = require("./config");
const { logger } = require("./utils/logger");

const port = config.get("app.port");

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});
