import { Controller, Get, Param, Post, Body, Patch, ParseIntPipe  } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async createOrUpdate(@Body() product: Product) {
      const result = await this.productService.createOrUpdate(product);
      if (!result.isSuccess) {
        return { success: false, message: result.error };
      }
      return { success: true, data: result.value };
    }
        
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
      const result = await this.productService.getById(id);
      if (!result.isSuccess) {
        return { success: false, message: result.error };
      }
      return { success: true, data: result.value };
    }

    @Patch(':id/stock')
    async subtractStock(
      @Param('id', ParseIntPipe ) id: number,
      @Body('stock') stock: number
    ) {
      const result = await this.productService.subtractStock(id, stock);
      if (!result.isSuccess) {
        return { success: false, message: result.error };
      }
      return { success: true, data: result.value };
    }
}
