import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepository } from './transaction.repository';
import { TransactionModel } from '../transaction.model';
import { Result } from '../../../common/result/result';

// Mock de TransactionModel para evitar interacciones con la base de datos real
jest.mock('../transaction.model', () => ({
  TransactionModel: {
    save: jest.fn(),
    get: jest.fn(),
  },
}));

describe('TransactionRepository', () => {
  let repository: TransactionRepository;
  let mockTransactionModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionRepository],
    }).compile();

    repository = module.get<TransactionRepository>(TransactionRepository);
    mockTransactionModel = TransactionModel;
  });

  describe('create', () => {
    it('should create and return a transaction', async () => {
      // Datos de prueba
      const transactionData = {
        id: '123',
        price: 100,
        currency: 'USD',
        transactionMethod: 'CREDIT_CARD',
        status: 'PENDING',
      };

      // Mock de la función save
      const mockSave = jest.fn().mockResolvedValue(transactionData);
      mockTransactionModel.save = mockSave;

      const result = await repository.create(transactionData);

      expect(mockSave).toHaveBeenCalledWith(transactionData);
      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(transactionData);
    });

    it('should return an error if the creation fails', async () => {
      const transactionData = {
        id: '123',
        price: 100,
        currency: 'USD',
        transactionMethod: 'CREDIT_CARD',
        status: 'PENDING',
      };

      // Simula un error en el proceso de guardado
      const mockSave = jest.fn().mockRejectedValue(new Error('Database error'));
      mockTransactionModel.save = mockSave;

      const result = await repository.create(transactionData);

      expect(mockSave).toHaveBeenCalledWith(transactionData);
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Error creating transaction: Database error');
    });
  });

  describe('findById', () => {
    it('should return a transaction if found', async () => {
      const transactionData = {
        id: '123',
        price: 100,
        currency: 'USD',
        transactionMethod: 'CREDIT_CARD',
        status: 'PENDING',
      };

      // Mock de la función get
      const mockGet = jest.fn().mockResolvedValue(transactionData);
      mockTransactionModel.get = mockGet;

      const result = await repository.findById('123');

      expect(mockGet).toHaveBeenCalledWith('123');
      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(transactionData);
    });

    it('should return an error if transaction is not found', async () => {
      const mockGet = jest.fn().mockResolvedValue(null);
      mockTransactionModel.get = mockGet;

      const result = await repository.findById('123');

      expect(mockGet).toHaveBeenCalledWith('123');
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Transaction not found');
    });

    it('should return an error if there is a database error', async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error('Database error'));
      mockTransactionModel.get = mockGet;

      const result = await repository.findById('123');

      expect(mockGet).toHaveBeenCalledWith('123');
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Error finding transaction: Database error');
    });
  });
});
