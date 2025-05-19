import { Injectable } from '@nestjs/common';
import { AddToCartDto } from '../dto/add-cart.dto';
import { RemoveFromCartDto } from '../dto/remove-cart.dto';
import { CartRepository } from '../repositories/cart.repository';
import { ProductRepository } from '../../products/repositories/product.repository';
import { Result } from '../../../common/result/result';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  userId: number;
  items: CartItem[];
}

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async addToCart(userId: number, dto: AddToCartDto): Promise<Result<any>> {
    const productResult = await this.productRepo.findById(dto.productId);
    if (!productResult.isSuccess) return Result.fail('Product not found');

    const product = productResult.value;
    if (!product) return Result.fail('Product does not exist');

    const stock = product.stock;

    const existing = await this.cartRepo.findByUserId(userId);
    const cart: Cart = existing.value || { userId, items: [] };

    const itemIndex = cart.items.findIndex((i) => i.productId === dto.productId);
    const currentQuantity = itemIndex !== -1 ? cart.items[itemIndex].quantity : 0;

    const totalRequested = currentQuantity + dto.quantity;

    if (totalRequested > stock) {
      return Result.fail(
        `Cannot add ${dto.quantity} items. Only ${stock - currentQuantity} left in stock.`,
      );
    }

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += dto.quantity;
    } else {
      cart.items.push({
        productId: dto.productId,
        name: dto.name,
        price: dto.price,
        quantity: dto.quantity,
      });
    }

    const updatedCart = await this.cartRepo.saveCart(cart);
    return Result.ok(updatedCart);
  }

  async removeFromCart(userId: number, dto: RemoveFromCartDto) {
    const result = await this.cartRepo.findByUserId(userId);
    if (!result.isSuccess) return result;

    const cart = result.value;
    if (!cart) return Result.fail('Cart not found');

    cart.items = cart.items.filter(
      (item: CartItem) => item.productId !== dto.productId,
    );

    return this.cartRepo.saveCart(cart);
  }

  async getCart(userId: number) {
    return this.cartRepo.findByUserId(userId);
  }
}
