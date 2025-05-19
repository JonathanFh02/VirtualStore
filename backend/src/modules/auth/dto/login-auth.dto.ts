import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  password: string;
  } 