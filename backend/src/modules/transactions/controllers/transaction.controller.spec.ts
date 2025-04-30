import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Result } from '../../../common/result/result';
import { BadRequestException } from '@nestjs/common';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  const mockTransactionService = {
    createTransaction: jest.fn(),
    getTransaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should return the created transaction on success', async () => {
      const dto: CreateTransactionDto = {
        userId: 1,
        price: 100,
        currency: 'USD',
        transactionMethod: 'credit_card',
        status: 'PENDING',
      };

      const createdTransaction = { ...dto, id: 'uuid-123' };

      mockTransactionService.createTransaction.mockResolvedValue(Result.ok(createdTransaction));

      const result = await controller.create(dto);

      expect(result).toEqual(createdTransaction);
    });

    it('should throw BadRequestException on failure', async () => {
      const dto: CreateTransactionDto = {
        userId: 1,
        price: 100,
        currency: 'USD',
        transactionMethod: 'credit_card',
        status: 'PENDING',
      };

      mockTransactionService.createTransaction.mockResolvedValue(Result.fail('Error al crear'));

      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return the transaction if found', async () => {
      const id = 'uuid-123';
      const transaction = {
        id,
        userId: 1,
        price: 100,
        currency: 'USD',
        transactionMethod: 'credit_card',
        status: 'PENDING',
      };

      mockTransactionService.getTransaction.mockResolvedValue(Result.ok(transaction));

      const result = await controller.findOne(id);

      expect(result).toEqual(transaction);
    });

    it('should throw BadRequestException if not found', async () => {
      const id = 'uuid-456';
      mockTransactionService.getTransaction.mockResolvedValue(Result.fail('Not found'));

      await expect(controller.findOne(id)).rejects.toThrow(BadRequestException);
    });
  });
});
