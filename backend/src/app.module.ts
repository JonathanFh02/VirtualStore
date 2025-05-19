import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transactions/transactions.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/products/product.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [TransactionModule, UserModule, AuthModule, ProductModule, CartModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
