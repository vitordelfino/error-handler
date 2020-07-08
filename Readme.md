[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/vitordelfino/express-handler-errors/branch/master/graph/badge.svg)](https://codecov.io/gh/vitordelfino/express-handler-errors)
![](https://img.shields.io/github/last-commit/vitordelfino/express-handler-errors/master)
![](https://img.shields.io/github/issues/vitordelfino/express-handler-errors/master)
![](https://img.shields.io/npm/dt/express-handler-errors)
![](https://img.shields.io/npm/v/express-handler-errors)
![](https://img.shields.io/github/package-json/keywords/vitordelfino/express-handler-errors)

# Express Handler Errors

Middleware to send custom errors in yours requests

## How to use

```typescript
import express, { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "express-handler-errors";

const app = express();

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  new ErrorHandler.handle(err, res, next);
});
```

You can pass a winston instance to log errors

```typescript
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  new ErrorHandler.handle(err, res, next, logger);
});
```

In your service

```typescript
import { CustomError } from "express-handler-errors";

class SomeService {
  async someMethod() {
    try {
      return doSomething();
    } catch (e) {
      throw new CustomError({
        code: "E0001",
        message: "some message",
        status: 400 // http status code
      });
    }
  }
}
```
