import { Injectable } from '@nestjs/common';
import { TransactionModel } from '.././transaction.model';
import { v4 as uuid } from 'uuid';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class TransactionRepository {
  async create(dto: CreateTransactionDto) {
    const transaction = new TransactionModel({
      id: uuid(),
      currency: dto.currency,
      status: 'PENDING',
    });

    await transaction.save();
    return transaction;
  }

  async findById(id: string) {
    return TransactionModel.get(id);
  }
}