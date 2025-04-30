import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { Result } from '../../../common/result/result';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

jest.mock('../repositories/user.repository');
jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: 1234567890,
        password: 'password',
      };

      const hashedPassword = 'hashedPassword';
      bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);

      const user = { ...createUserDto, password: hashedPassword };

      userRepository.findById = jest.fn().mockResolvedValue(Result.fail('User not found'));
      userRepository.create = jest.fn().mockResolvedValue(Result.ok(user));

      const result = await service.create(createUserDto);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(user);
      expect(userRepository.findById).toHaveBeenCalledWith(createUserDto.id);
      expect(userRepository.create).toHaveBeenCalledWith(user);
    });

    it('should return an error if the user already exists', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: 1234567890,
        password: 'password',
      };

      userRepository.findById = jest.fn().mockResolvedValue(Result.ok({}));

      const result = await service.create(createUserDto);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('El usuario ya existe con esta Id');
      expect(userRepository.findById).toHaveBeenCalledWith(createUserDto.id);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
      userRepository.findByEmail = jest.fn().mockResolvedValue(Result.ok(user));

      const result = await service.findByEmail('john.doe@example.com');

      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(user);
      expect(userRepository.findByEmail).toHaveBeenCalledWith('john.doe@example.com');
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
      userRepository.findById = jest.fn().mockResolvedValue(Result.ok(user));

      const result = await service.findById(1);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(user);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should return an error if the user does not exist', async () => {
      userRepository.findById = jest.fn().mockResolvedValue(Result.fail('User not found'));

      const result = await service.findById(1);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('User not found');
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });
  });
});
