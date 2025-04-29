import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Result } from '../../../common/result/result';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(dto: CreateTransactionDto): Promise<Result<any>> {
    
    const transactionData = {
      id: uuidv4(),
      userId: dto.userId,
      price: dto.price,
      currency: dto.currency,
      transactionMethod: dto.transactionMethod,
      status: 'PENDING',
    };

    try {
      const transaction = await this.transactionRepository.create(transactionData);
      return Result.ok(transaction);
    } catch (error) {
      return Result.fail(`Error al crear la transacción: ${error.message}`);
    }
  }

  async getTransaction(id: string): Promise<Result<any>> {
    return this.transactionRepository.findById(id);
  }
}
