import { Module } from '@nestjs/common';
import { ProductController } from '../products/controllers/product.controller';
import { ProductService } from '../products/services/product.service';
import { ProductRepository } from '../products/repositories/product.repository';



@Module({
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService],
  })
export class ProductModule {}
