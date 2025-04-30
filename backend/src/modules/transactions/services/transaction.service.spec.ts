import { TransactionService } from './transaction.service';
import { TransactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Result } from '../../../common/result/result';

describe('TransactionService', () => {
  let service: TransactionService;


  const mockTransactionRepository = {
    create: jest.fn() as jest.Mock,
    findById: jest.fn() as jest.Mock,
  };

  beforeEach(() => {
    service = new TransactionService(
      mockTransactionRepository as unknown as TransactionRepository,
    );

    
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('debería crear una transacción correctamente', async () => {
      const dto: CreateTransactionDto = {
        userId: 1,
        price: 100,
        currency: 'USD',
        transactionMethod: 'CARD',
        status: 'PENDING',
      };

      const mockTransaction = {
        id: 'uuid-test',
        ...dto,
      };

      mockTransactionRepository.create.mockResolvedValue(Result.ok(mockTransaction));

      const result = await service.createTransaction(dto);

      expect(mockTransactionRepository.create).toHaveBeenCalled();
      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(mockTransaction);
    });

    it('debería retornar error si falla al crear', async () => {
      const dto: CreateTransactionDto = {
        userId: 1,
        price: 100,
        currency: 'USD',
        transactionMethod: 'CARD',
        status: 'PENDING',
      };

      mockTransactionRepository.create.mockRejectedValue(new Error('DB error'));

      const result = await service.createTransaction(dto);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toContain('Error al crear la transacción');
    });
  });

  describe('getTransaction', () => {
    it('debería retornar una transacción por ID', async () => {
      const mockTransaction = {
        id: 'uuid-test',
        userId: 1,
        price: 100,
        currency: 'USD',
        transactionMethod: 'CARD',
        status: 'PENDING',
      };

      mockTransactionRepository.findById.mockResolvedValue(Result.ok(mockTransaction));

      const result = await service.getTransaction('uuid-test');

      expect(mockTransactionRepository.findById).toHaveBeenCalledWith('uuid-test');
      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(mockTransaction);
    });

    it('debería manejar error al buscar por ID', async () => {
      mockTransactionRepository.findById.mockRejectedValue(new Error('Not found'));

      const result = await service.getTransaction('uuid-test');

      expect(result.isSuccess).toBe(false);
      expect(result.error).toContain('Not found');
    });
  });
});
