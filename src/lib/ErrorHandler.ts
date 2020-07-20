import { ValidationError } from "class-validator";
import { Response, NextFunction } from "express";
import { Logger } from "winston";
import { ValidationError as YupValidationError } from "yup";

import { CustomError } from "../models/CustomError";
import { CustomPrismaError } from "../models/CustomPrismaError";

export class ErrorHandler {
  public handle(
    err: Error,
    res: Response,
    next: NextFunction,
    logger?: Logger,
    ...callbacks: Function[]
  ): void {
    if (logger)
      logger.error(`ErrorHandle::handle::${err.name}::${err.message}`);
    if (callbacks && callbacks.length > 0) {
      console.log("callbacks", callbacks);
      callbacks.forEach(callback => callback(err, res, next));
    }
    if (err instanceof CustomPrismaError) {
      res.status(err.status).json(err.getErrorResponse());
    } else if (err instanceof CustomError) {
      res.status(err.error.status).json(err.getErrorResponse());
    } else if (err instanceof YupValidationError) {
      const errors = err.errors.map((error: string) => ({
        code: err.name,
        message: error
      }));
      res.status(400).json({ errors });
    } else if (Array.isArray(err) && err[0] instanceof ValidationError) {
      const errors = err.map((e: ValidationError) => {
        const messages = Object.keys(e.constraints!).map(
          key => e.constraints![key]
        );

        return { code: "ValidationError", messages };
      });
      res.status(400).json({ errors });
    } else {
      res.status(500).json({
        errors: [
          {
            code: "E0001",
            message: err.message
          }
        ]
      });
    }
    next(err);
  }
}
