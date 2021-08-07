import { app } from "./app";
import { logger } from "./config";
import { config } from "./config";

const port = config.get("app.port");

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});
