import { IsString, IsNumber, IsNotEmpty } from 'class-validator';


export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
