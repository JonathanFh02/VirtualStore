import {
  Controller,
  UseGuards,
  Post,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dto/add-cart.dto';
import { RemoveFromCartDto } from '../dto/remove-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToCart(@Body() dto: AddToCartDto, @Req() req) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  async removeFromCart(@Body() dto: RemoveFromCartDto, @Req() req) {
    const userId = req.user.id;
    return this.cartService.removeFromCart(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }
}
