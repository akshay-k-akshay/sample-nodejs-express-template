import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { sampleService } from "../services";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const sampleData = req.body;
    const result = await sampleService.create(sampleData);
    return res.status(StatusCodes.OK).json({
      message: "sample data saved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit, page } = req.query;
    const result = await sampleService.list(
      Number(limit) || 5,
      Number(page) || 1
    );
    return res.status(StatusCodes.OK).json({
      message: "fetched sample data successfully",
      ...result
    });
  } catch (error) {
    next(error);
  }
}
