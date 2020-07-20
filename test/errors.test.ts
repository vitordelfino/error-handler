import request from "supertest";

import { app, app2 } from "./setup";
// import app2 from "./setup2";

describe("Error Handler Tests", () => {
  test("should return error pass by callback functions", async () => {
    await request(app2)
      .get("/custom-other-error")
      .expect(400, {
        otherErrors: [
          {
            code: "OTHER_ERROR",
            status: 400,
            message: "Throw another error"
          }
        ]
      });
  });

  test("should return else error pass by callback functions", async () => {
    await request(app2)
      .get("/else-custom-other-error")
      .expect(500, {
        elseOtherErrors: [
          {
            code: "ELSE_OTHER_ERROR",
            status: 500,
            message: "Throw another error"
          }
        ]
      });
  });
  test("should return error when validate with yup", async () => {
    await request(app)
      .post("/yup")
      .expect(400, {
        errors: [
          { code: "ValidationError", message: "teste is a required field" }
        ]
      });
  });

  test("should return error when validate with class-validator", async () => {
    await request(app)
      .post("/class-validator")
      .send({ param1: "param" })
      .expect(400, {
        errors: [
          {
            code: "ValidationError",
            messages: ["param2 must be defined", "param2 must be string"]
          }
        ]
      });
  });

  test("should returm CustomError", async () => {
    await request(app)
      .get("/custom-error")
      .expect(400, {
        errors: [{ code: "CustomError", message: "custom error", status: 400 }]
      });
  });
  test("should returm CustomPrismaError", async () => {
    await request(app)
      .get("/custom-prisma-error")
      .expect(422, {
        code: "PrismaValidationError",
        errors: ["Some error", "Other error"],
        status: 422
      });
  });
  test("should returm Error", async () => {
    await request(app)
      .get("/error")
      .send({ param1: "param" })
      .expect(500, {
        errors: [{ code: "E0001", message: "some error" }]
      });
  });
});
