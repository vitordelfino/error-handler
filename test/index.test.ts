import request from "supertest";

import app from "./setup";

describe("Error Handler Tests", () => {
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
      .send({ param1: "param" })
      .expect(400, {
        errors: [{ code: "CustomError", message: "custom error", status: 400 }]
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
