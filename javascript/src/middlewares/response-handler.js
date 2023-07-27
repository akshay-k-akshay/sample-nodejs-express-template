const { StatusCodes } = require("http-status-codes");

module.exports = {
  successResponse(res, message, data) {
    return res
      .status(StatusCodes.OK)
      .json({ message, status: "success", data });
  },

  UnAuthorizedResponse(res, message, data) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message, status: "failed", data });
  },

  NotFoundResponse(res, message, data) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message, status: "failed", data });
  },

  BadRequestResponse(res, message, data) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message, status: "failed", data });
  },

  ForbiddenResponse(res, message, data) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message, status: "failed", data });
  },

  InternalErrorResponse(res, message, data) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message, status: "failed", data });
  }
};
