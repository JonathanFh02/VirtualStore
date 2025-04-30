import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { Result } from '../../../common/result/result';
import { Product } from '../product.model';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    
    async createOrUpdate(product: Product): Promise<Result<Product>> {
        
        const result = await this.productRepository.createProduct(product);
        return result; 
    }


    async getById(id: number): Promise<Result<Product>> {
  
        const result = await this.productRepository.findById(id);
        return result; 
    }

    async subtractStock(id: number, stock: number): Promise<Result<Product>> {
        
        const result = await this.productRepository.subtractStock(id, stock);
        return result; 
    }
}
