export class Transaction {
    id: string;
    userId: number;
    price: number;
    currency: string;
    transactionMethod: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';

}