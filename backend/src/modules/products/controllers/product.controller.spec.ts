import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';
import { Result } from '../../../common/result/result';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  const mockProductService = {
    createOrUpdate: jest.fn(),
    getById: jest.fn(),
    subtractStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('createOrUpdate', () => {
    it('should return success message when product is created or updated successfully', async () => {
      const product: Product = {
        id: 1, name: 'Product 1', price: 100, stock: 10,
        description: ''
      };
      mockProductService.createOrUpdate.mockResolvedValue(Result.ok(product));

      const result = await controller.createOrUpdate(product);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(product);
    });

    it('should return failure message when product creation or update fails', async () => {
      const product: Product = {
        id: 1, name: 'Product 1', price: 100, stock: 10,
        description: ''
      };
      mockProductService.createOrUpdate.mockResolvedValue(Result.fail('Error creating or updating product'));

      const result = await controller.createOrUpdate(product);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Error creating or updating product');
    });
  });

  describe('getById', () => {
    it('should return success message with product data when product is found', async () => {
      const product: Product = {
        id: 1, name: 'Product 1', price: 100, stock: 10,
        description: ''
      };
      mockProductService.getById.mockResolvedValue(Result.ok(product));

      const result = await controller.getById(1);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(product);
    });

    it('should return failure message when product is not found', async () => {
      mockProductService.getById.mockResolvedValue(Result.fail('Product not found'));

      const result = await controller.getById(1);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Product not found');
    });
  });

  describe('subtractStock', () => {
    it('should return success message when stock is subtracted successfully', async () => {
      const updatedProduct: Product = {
        id: 1, name: 'Product 1', price: 100, stock: 5,
        description: ''
      };
      mockProductService.subtractStock.mockResolvedValue(Result.ok(updatedProduct));

      const result = await controller.subtractStock(1, 5);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedProduct);
    });

    it('should return failure message when stock subtraction fails', async () => {
      mockProductService.subtractStock.mockResolvedValue(Result.fail('Error subtracting stock'));

      const result = await controller.subtractStock(1, 5);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Error subtracting stock');
    });
  });
});
