export class Transaction {
    price: number;
    currency: string;
    paymentMethod: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';

}