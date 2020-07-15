export class CustomPrismaError extends Error {
  private readonly errors: string[];

  public readonly status: number;

  constructor(errors: string[], status = 422) {
    super("Prisma validation Error");
    this.errors = errors;
    this.status = status;
  }

  public getErrorResponse(): {
    code: string;
    status: number;
    errors: string[];
  } {
    return {
      errors: this.errors,
      code: "PrismaValidationError",
      status: this.status
    };
  }
}
