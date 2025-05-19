import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { Result } from '../../../common/result/result';
import { Product } from '../product.model';
import * as AWS from 'aws-sdk';

@Injectable()
export class ProductService {
  private s3 = new AWS.S3();

  constructor(private readonly productRepository: ProductRepository) { }

  async createOrUpdate(product: CreateProductDto): Promise<Result<Product>> {
    // Aquí se asegura que imageUrl sea parte del producto
    return this.productRepository.createProduct(product);
  }

  async uploadImageToS3(file: Express.Multer.File): Promise<string> {
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME!, // Asegúrate de que el nombre del bucket esté correctamente definido en tu .env
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const uploadResult = await this.s3.upload(s3Params).promise();
      return uploadResult.Location; // Esto es la URL pública del archivo en S3
    } catch (error) {
      throw new Error('Error uploading file to S3: ' + error.message);
    }
  }

  async getById(id: number): Promise<Result<Product>> {
    return this.productRepository.findById(id);
  }

  async getAll(): Promise<Result<Product[]>> {
    
    return this.productRepository.getAll();
  }

  async subtractStock(id: number, stock: number): Promise<Result<Product>> {
    return this.productRepository.subtractStock(id, stock);
  }
}
