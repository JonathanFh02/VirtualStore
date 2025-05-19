import { Injectable } from '@nestjs/common';
import { CartModel } from '../cart.model';
import { Result } from '../../../common/result/result';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartRepository {
  async findByUserId(userId: number): Promise<Result<Cart>> {
    try {
      const cartData = await CartModel.get(Number(userId));
  
      if (
        cartData &&
        typeof cartData === 'object' &&
        'userId' in cartData &&
        'items' in cartData &&
        Array.isArray(cartData.items)
      ) {
        return Result.ok(cartData as unknown as Cart); 
      }
  
      return Result.fail('Cart not found');
    } catch (error) {
      return Result.fail(`Error retrieving cart: ${error.message}`);
    }
  }
  
  async saveCart(cartData: Cart): Promise<Result<Cart>> {
    try {
      const saved = await new CartModel(cartData).save();
      return Result.ok(saved as unknown as Cart); 
    } catch (error) {
      return Result.fail(`Error saving cart: ${error.message}`);
    }
  }
}