import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionModel } from './transaction.model';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}