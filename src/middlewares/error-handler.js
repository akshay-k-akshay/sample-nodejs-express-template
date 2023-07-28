const { logger } = require("../config");
const { Errors } = require("../errors");
const {
  BadRequestResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  UnAuthorizedResponse
} = require("./response-handler");

// eslint-disable-next-line
function errorHandler(error, _req, res, _next) {
  logger.error(error);
  switch (error.name) {
    case Errors.UNAUTHORIZED:
      return UnAuthorizedResponse(res, error.message, error.args);
    case Errors.NOT_FOUND:
      return NotFoundResponse(res, error.message, error.args);
    case Errors.BAD_REQUEST:
      return BadRequestResponse(res, error.message, error.args);
    case Errors.FORBIDDEN:
      return ForbiddenResponse(res, error.message, error.args);
    default:
      return InternalErrorResponse(res, "Something Went Wrong", error.args);
  }
}

module.exports = errorHandler;
