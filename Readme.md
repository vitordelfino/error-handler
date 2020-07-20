[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![CI](https://github.com/vitordelfino/express-handler-errors/workflows/CI/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/vitordelfino/express-handler-errors/badge.svg?branch=master)](https://coveralls.io/github/vitordelfino/express-handler-errors?branch=master)
![](https://img.shields.io/github/last-commit/vitordelfino/express-handler-errors/master)
![](https://img.shields.io/github/issues/vitordelfino/express-handler-errors/master)
![](https://img.shields.io/npm/dt/express-handler-errors)
![](https://img.shields.io/npm/v/express-handler-errors)
![](https://img.shields.io/github/package-json/keywords/vitordelfino/express-handler-errors)

# Express Handler Errors

Middleware to send custom errors in yours requests

## How to use

![configure](./docs/configure.png)

- Using with [Prisma v2](https://www.prisma.io/docs/)

![prisma](./docs/prisma.png)

You can pass a winston instance to log errors

![logger](./docs/logger.png)

In your service

![service](./docs/service.png)

## implement your own error functions and pass by parameter

- Error classes

![config class](./docs/config-class.png)

- Configure Hadler on express

![config functions](./docs/config-functions.png)
