import { IsString, IsDefined } from "class-validator";

export class Teste {
  @IsString({ message: "$property must be string" })
  @IsDefined({ message: "$property must be defined" })
  param1!: string;

  @IsString({ message: "$property must be string" })
  @IsDefined({ message: "$property must be defined" })
  param2!: string;
}

export class OtherCustomError extends Error {
  public readonly error: any;

  constructor(error: any) {
    super(error.message);
    this.error = error;
  }

  public getErroResponse(): { otherErrors: any[] } {
    return {
      otherErrors: [this.error]
    };
  }
}

export class ElseOtherCustomError extends Error {
  public readonly error: any;

  constructor(error: any) {
    super(error.message);
    this.error = error;
  }

  public getErroResponse(): { elseOtherErrors: any[] } {
    return {
      elseOtherErrors: [this.error]
    };
  }
}
