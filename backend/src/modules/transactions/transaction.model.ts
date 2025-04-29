import { Schema, model } from 'dynamoose';

const TransactionSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    userId: {
      type: Number,  
      required: true,  
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    transactionMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'PENDING',
    },
  }
);


export const TransactionModel = model('Transaction', TransactionSchema);

export interface TransactionM {
  id: string;
  userId: string;
  amount: number;
  status?: string;
}