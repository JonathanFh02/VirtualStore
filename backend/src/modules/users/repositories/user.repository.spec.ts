import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserModel } from '../user.model';

jest.mock('../user.model'); 

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const user = { 
        id: 1, 
        email: 'test@test.com', 
        name: 'Test User', 
        phoneNumber: 1234567890, 
        password: 'hashedPassword' 
      };
      const mockSave = jest.fn().mockResolvedValue(user);
      UserModel.prototype.save = mockSave;

      const result = await repository.create(user);
      
      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(user);
      expect(mockSave).toHaveBeenCalledTimes(1);
    });

    it('should return a failure if error occurs while creating user', async () => {
      const user = { 
        id: 1, 
        email: 'test@test.com', 
        name: 'Test User', 
        phoneNumber: 1234567890, 
        password: 'hashedPassword' 
      };
      const mockSave = jest.fn().mockRejectedValue(new Error('Database error'));
      UserModel.prototype.save = mockSave;

      const result = await repository.create(user);
      
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Error creating user: Database error');
    });
  });

  describe('findById', () => {
    it('should find a user by ID', async () => {
      const user = { 
        id: 1, 
        email: 'test@test.com', 
        name: 'Test User', 
        phoneNumber: '1234567890', 
        password: 'hashedPassword' 
      };
      const mockGet = jest.fn().mockResolvedValue(user);
      UserModel.get = mockGet;

      const result = await repository.findById(1);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(user);
      expect(mockGet).toHaveBeenCalledWith(1);
    });

    it('should return a failure if user is not found', async () => {
      const mockGet = jest.fn().mockResolvedValue(null);
      UserModel.get = mockGet;

      const result = await repository.findById(999);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('User not found');
    });

    it('should return a failure if an error occurs while finding user by ID', async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error('Database error'));
      UserModel.get = mockGet;

      const result = await repository.findById(1);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Error finding user: Database error');
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const user = { 
        id: 1, 
        email: 'test@test.com', 
        name: 'Test User', 
        phoneNumber: '1234567890', 
        password: 'hashedPassword' 
      };
      const mockScan = jest.fn().mockResolvedValue([user]);
      UserModel.scan = mockScan;

      const result = await repository.findByEmail('test@test.com');

      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(user);
      expect(mockScan).toHaveBeenCalledWith('email');
    });

    it('should return a failure if user is not found by email', async () => {
      const mockScan = jest.fn().mockResolvedValue([]);
      UserModel.scan = mockScan;

      const result = await repository.findByEmail('nonexistent@test.com');

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('User not found');
    });

    it('should return a failure if an error occurs while finding user by email', async () => {
      const mockScan = jest.fn().mockRejectedValue(new Error('Database error'));
      UserModel.scan = mockScan;

      const result = await repository.findByEmail('test@test.com');

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Error finding user by email: Database error');
    });
  });
});
