import { IsNumber, IsString } from 'class-validator';

export class RemoveFromCartDto {

  @IsNumber()
  productId: number;
}
