import { IsEmail, MinLength, IsString, IsNumber, IsNotEmpty } from 'class-validator';


export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  phoneNumber: number;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
