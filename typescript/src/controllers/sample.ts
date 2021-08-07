import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { sampleService } from "../services";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const sampleData = req.body;
    const result = await sampleService.create(sampleData);
    return res.status(StatusCodes.OK).json({
      message: "pong",
      data: result
    });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await sampleService.list();
    return res.status(StatusCodes.OK).json({
      message: "ping",
      data: result
    });
  } catch (error) {
    next(error);
  }
}
