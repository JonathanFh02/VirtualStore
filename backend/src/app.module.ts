import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transactions/transactions.module';
import { UserModule } from './modules/users/user.module';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { AuthService } from './modules/auth/service/auth.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TransactionModule, UserModule, AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
