import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Result } from '../../../common/result/result';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return the result', async () => {
      const dto: CreateUserDto = { 
        id: 1, 
        name: 'John Doe', 
        email: 'john.doe@example.com', 
        phoneNumber: 1234567890, 
        password: 'password123',
      };

      const result = Result.ok({ ...dto, id: 1 });
      mockUserService.create.mockResolvedValue(result);

      expect(await userController.createUser(dto)).toEqual(result);
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if user already exists', async () => {
      const dto: CreateUserDto = { 
        id: 1, 
        name: 'John Doe', 
        email: 'john.doe@example.com', 
        phoneNumber: 1234567890, 
        password: 'password123',
      };

      const result = Result.fail('El usuario ya existe con esta Id');
      mockUserService.create.mockResolvedValue(result);

      await expect(userController.createUser(dto)).rejects.toThrow(BadRequestException);
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getUserById', () => {
    it('should return user when user is found', async () => {
      const id = 1;
      const result = Result.ok({ id, name: 'John Doe' });
      mockUserService.findById.mockResolvedValue(result);

      expect(await userController.getUserById(id)).toEqual(result);
      expect(mockUserService.findById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if user is not found', async () => {
      const id = 1;
      const result = Result.fail('User not found');
      mockUserService.findById.mockResolvedValue(result);

      await expect(userController.getUserById(id)).rejects.toThrow(BadRequestException);
      expect(mockUserService.findById).toHaveBeenCalledWith(id);
    });
  });
});
