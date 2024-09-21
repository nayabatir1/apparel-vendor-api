import { NextFunction, Request, Response } from "express";
import status from "http-status";

import { AsyncRouteHandler } from "./types";

export const catchAsync = (fn: AsyncRouteHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err: Error) => {
      res.status(status.BAD_REQUEST).json({ message: err.message });
    });
  };
};
