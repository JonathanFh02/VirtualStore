import { IsString, IsNumber, IsNotEmpty, IsOptional  } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  imageUrl?: string; 
}
