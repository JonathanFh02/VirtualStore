import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transactions/transactions.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [TransactionModule, UserModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
