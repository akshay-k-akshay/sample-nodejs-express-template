import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export function ping(req: Request, res: Response): Response {
  return res.status(StatusCodes.OK).json({
    message: "pong"
  });
}

export function pong(req: Request, res: Response): Response {
  return res.status(StatusCodes.OK).json({
    message: "ping"
  });
}
