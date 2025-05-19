import { Injectable } from '@nestjs/common';
import { Product, ProductModel } from '../product.model';
import { Result } from '../../../common/result/result';
@Injectable()
export class ProductRepository {

  private readonly productModel = ProductModel;
  async createProduct(product: Product): Promise<Result<Product>> {
    try {
      const existing = await ProductModel.get(product.id);

      if (existing) {
        existing.stock += product.stock;
        const updated = await existing.save();
        return Result.ok(updated.toJSON() as Product);
      }
      const newProduct = new ProductModel(product);
      const savedProduct = await newProduct.save();
      return Result.ok(savedProduct.toJSON() as Product);
    } catch (error) {
      return Result.fail('Error creating product: ' + error.message);
    }
  }

  async findById(id: number): Promise<Result<Product>> {
    try {
      const product = await ProductModel.get(id);

      if (!product) {
        return Result.fail('Product not found');
      }

      return Result.ok(product.toJSON() as Product);
    } catch (error) {
      return Result.fail('Error finding product: ' + error.message);
    }
  }

  async getAll(): Promise<Result<Product[]>> {
    try {
      const products = await ProductModel.scan().exec();
  
      if (!products || products.length === 0) {
        return Result.fail('No se encontraron productos');
      }
  
      const result = products.map(product => product.toJSON() as Product);
  
      return Result.ok(result);
    } catch (error) {
      return Result.fail('Error al obtener productos: ' + error.message);
    }
  }
  

  async subtractStock(id: number, stock: number): Promise<Result<Product>> {
    try {
      const product = await ProductModel.get(id);

      if (!product) {
        return Result.fail('Producto no encontrado');
      }

      if (product.stock < stock) {
        return Result.fail('Stock insuficiente');
      }

      product.stock -= stock;
      const updated = await product.save();
      return Result.ok(updated.toJSON() as Product);
    } catch (error) {
      return Result.fail('Error al restar stock: ' + error.message);
    }
  }
}