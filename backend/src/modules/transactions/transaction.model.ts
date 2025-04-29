import * as dynamoose from 'dynamoose';

export const TransactionModel = dynamoose.model('Transaction', {
  id: {
    type: String,
    hashKey: true,
  },
  amount: Number,
  currency: String,
  status: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});
