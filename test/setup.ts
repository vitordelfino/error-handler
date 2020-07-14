import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import express, { Response, NextFunction } from "express";
import * as yup from "yup";

import { ErrorHandler } from "../src/lib/ErrorHandler";
import { CustomError } from "../src/models/CustomError";
import { CustomPrismaError } from "../src/models/CustomPrismaError";
import { Teste } from "./ClassTest";
import logger from "./mock-logger";
import "express-async-errors";

const app = express();

app.use(express.json());

const yupError = async (req: any, _: Response, next: NextFunction) => {
  await yup
    .object()
    .shape({
      teste: yup.string().required()
    })
    .validate(req.body, { abortEarly: false });
  return next();
};

const classValidatorError = async (
  req: any,
  _: Response,
  next: NextFunction
) => {
  const transformed = plainToClass(Teste, req.body);
  await validateOrReject(transformed);
  return next();
};

app.post("/yup", yupError, (_: any, res: Response) => {
  res.json({ message: "OK" });
});

app.post("/class-validator", classValidatorError, (_, res: Response) => {
  res.json({ message: "OK" });
});

app.get("/custom-error", () => {
  throw new CustomError({
    code: "CustomError",
    message: "custom error",
    status: 400
  });
});

app.get("/custom-prisma-error", () => {
  throw new CustomPrismaError(["Some error", "Other error"]);
});

app.get("/error", () => {
  throw new Error("some error");
});

app.use((err: Error, _: any, res: Response, next: NextFunction) => {
  new ErrorHandler().handle(err, res, next, logger as any);
});
export default app;
