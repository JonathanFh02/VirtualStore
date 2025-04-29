import { Injectable } from '@nestjs/common';
import { TransactionModel, TransactionM } from '../transaction.model';
import { Result } from '../../../common/result/result';

@Injectable()
export class TransactionRepository {
  async create(data: {
    id: string;
    price: number;
    currency: string;
    transactionMethod: string;
    status?: string;
  }): Promise<Result<TransactionM>> {
    try {
      const transaction = new TransactionModel(data);
      const savedTransaction = await transaction.save();
      return Result.ok(savedTransaction.toJSON() as TransactionM);
    } catch (error) {
      return Result.fail('Error creating transaction: ' + error.message);
    }
  }

  async findById(id: string): Promise<Result<TransactionM>> {
    try {
      const transaction = await TransactionModel.get(id);

      if (!transaction) {
        return Result.fail('Transaction not found');
      }

      return Result.ok(transaction.toJSON() as TransactionM); 
    } catch (error) {
      return Result.fail('Error finding transaction: ' + error.message);
    }
  }
}

