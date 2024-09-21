import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import status from "http-status";

export const validate =
  <T>(schema: Joi.ObjectSchema<T> | Joi.ArraySchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const { error, value } = schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      console.log(error);
      return res.status(status.BAD_REQUEST).send(error.details[0].message);
    }

    // setting parsed values
    req.body = value;

    next();
  };
