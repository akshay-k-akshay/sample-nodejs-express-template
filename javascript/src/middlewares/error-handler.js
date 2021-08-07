const { StatusCodes } = require("http-status-codes");

const { NotFoundError, BadRequestError } = require("../errors");
const { logger } = require("../config/winston");

function errorHandler(error, req, res, next) {
  logger.error(error);

  switch (error.constructor) {
    case NotFoundError:
      return res.status(StatusCodes.NOT_FOUND).json({
        message: error.message
      });

    case BadRequestError:
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message
      });

    default:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
  }

  next();
}
module.exports = {
  errorHandler
};
