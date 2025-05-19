import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { CartRepository } from './repositories/cart.repository';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [ProductModule],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
