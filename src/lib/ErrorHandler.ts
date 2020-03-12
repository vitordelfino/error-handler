import { CustomError } from './../models/CustomError'
import { Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import { Logger } from 'winston';
export class ErrorHandle {
  public handle(
    err: Error,
    res: Response,
    next: NextFunction,
    logger?: Logger,
  ): void {
    if(logger)
      logger.error(`ErrorHandle::handle::${err.name}::${err.message}`);
    if(err instanceof CustomError) {
      res.status(err.error.status).json(err.getErrorResponse());
    } else if (err instanceof ValidationError) {
      const errors = err.errors.map((error: string) => ({ code: err.name, message: error }));
      res.status(400).json({ errors });
    } else {
      res.status(500).json({
        errors: [
          {
            code: 'E0001',
            message: err.message,
          },
        ],
      });
    }
    next(err)
  }
}
