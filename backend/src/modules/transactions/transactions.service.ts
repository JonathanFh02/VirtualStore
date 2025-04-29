import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './repositories/transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(dto: CreateTransactionDto) {
    const transaction = await this.transactionRepository.create(dto);
    return transaction;
  }

  async getTransaction(id: string) {
    return this.transactionRepository.findById(id);
  }
}