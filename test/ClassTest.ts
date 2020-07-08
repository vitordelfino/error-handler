import { IsString, IsDefined } from "class-validator";

export class Teste {

  @IsString({ message: '$property must be string' })
  @IsDefined({ message: '$property must be defined' })
  param1!: string;

  @IsString({ message: '$property must be string' })
  @IsDefined({ message: '$property must be defined' })
  param2!: string;

}
