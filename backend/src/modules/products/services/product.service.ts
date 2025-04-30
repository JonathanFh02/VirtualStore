import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { Result } from '../../../common/result/result';
import { Product } from '../product.model';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    async createOrUpdate(product: Product): Promise<Result<Product>> {
        return this.productRepository.createProduct(product);
      }
    
      async getById(id: number): Promise<Result<Product>> {
        return this.productRepository.findById(id);
      }
    
      async subtractStock(id: number, stock: number): Promise<Result<Product>> {
        return this.productRepository.subtractStock(id, stock);
      }
}
