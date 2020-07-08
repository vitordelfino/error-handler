export type IErrorResponse = {
  code: string;
  message: string;
  status: number;
};
export class CustomError extends Error {
  public readonly error: IErrorResponse;

  constructor(error: IErrorResponse) {
    super(error.message);
    this.error = error;
  }

  public getErrorResponse(): { errors: IErrorResponse[] } {
    return {
      errors: [this.error]
    };
  }
}
