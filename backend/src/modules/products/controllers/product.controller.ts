import { Controller, Get, Param, Post, Body, Patch, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Asegúrate de que "image" sea el nombre del campo en el formulario
  async createOrUpdate(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    // Si hay una imagen, subimos la imagen a S3

    const product: CreateProductDto = {
      id: Number(body.id),
      name: body.name,
      description: body.description,
      price: Number(body.price),
      stock: Number(body.stock),
      imageUrl: ''
    };

    if (file) {
      const imageUrl = await this.productService.uploadImageToS3(file);
      product.imageUrl = imageUrl;  // Asignamos la URL de la imagen al producto
    }


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

  @Get()
  async getAll() {
    const result = await this.productService.getAll();
    if (!result.isSuccess) {
      return { success: false, message: result.error };
    }
    return { success: true, data: result.value };
  }

  @Patch(':id/stock')
  async subtractStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('stock') stock: number
  ) {
    const result = await this.productService.subtractStock(id, stock);
    if (!result.isSuccess) {
      return { success: false, message: result.error };
    }
    return { success: true, data: result.value };
  }
}
