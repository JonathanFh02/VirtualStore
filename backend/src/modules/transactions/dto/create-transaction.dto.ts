import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsEnum(['PENDING', 'APPROVED', 'DECLINED'])
  @IsNotEmpty()
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
}