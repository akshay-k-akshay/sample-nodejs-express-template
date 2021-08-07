import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { NotFoundError, BadRequestError } from "../errors";
import { logger } from "../config/winston";

export function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
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
