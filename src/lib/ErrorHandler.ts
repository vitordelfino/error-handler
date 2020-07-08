import { CustomError } from './../models/CustomError'
import { Response, NextFunction } from 'express';
import { ValidationError as YupValidationError } from 'yup';
import { ValidationError } from 'class-validator';
import { Logger } from 'winston';
class ErrorHandler {
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
    } else if (err instanceof YupValidationError) {
      const errors = err.errors.map((error: string) => ({ code: err.name, message: error }));
      res.status(400).json({ errors });
    } else if (Array.isArray(err) && err[0] instanceof ValidationError) {
      const errors = err.map((e: ValidationError) => {
        const messages = Object.keys(e.constraints!).map(key => e.constraints![key])

        return { code: 'ValidationError', messages}
      })
      res.status(400).json({ errors })
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

export default new ErrorHandler();
