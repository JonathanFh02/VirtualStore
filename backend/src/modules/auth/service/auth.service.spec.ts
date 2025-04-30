import { AuthService } from './auth.service';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Result } from '../../../common/result/result';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../auth/dto/register-auth.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  let hashedPassword: string;

  const plainPassword = 'password123';
  const mockUserBase = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    phoneNumber: 1234567890,
  };

  beforeAll(async () => {
    hashedPassword = await bcrypt.hash(plainPassword, 10);
  });

  beforeEach(() => {
    userService = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as any;

    jwtService = {
      signAsync: jest.fn(),
    } as any;

    authService = new AuthService(userService, jwtService);
  });

  describe('validateUser', () => {
    it('should return fail if user is not found', async () => {
      userService.findById.mockResolvedValue(Result.fail('Usuario no encontrado'));
      const result = await authService.validateUser(1, plainPassword);
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Usuario no encontrado');
    });

    it('should return fail if password is incorrect', async () => {
      const userWithDifferentPassword = { ...mockUserBase, password: await bcrypt.hash('otherpass', 10) };
      userService.findById.mockResolvedValue(Result.ok(userWithDifferentPassword));
      const result = await authService.validateUser(1, plainPassword);
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Contraseña incorrecta');
    });

    it('should return user if credentials are correct', async () => {
      const user = { ...mockUserBase, password: hashedPassword };
      userService.findById.mockResolvedValue(Result.ok(user));
      const result = await authService.validateUser(1, plainPassword);
      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.value?.email).toBe(user.email);
      }
    });
  });

  describe('login', () => {
    it('should return fail if user is not valid', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(Result.fail('Usuario no encontrado'));
      const result = await authService.login(1, plainPassword);
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Usuario no encontrado');
    });

    it('should return access_token if credentials are valid', async () => {
      const user = { ...mockUserBase, password: hashedPassword };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(Result.ok(user));
      jwtService.signAsync.mockResolvedValue('mock_token');

      const result = await authService.login(1, plainPassword);
      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.value?.access_token).toBe('mock_token');
      }
    });
  });

  describe('register', () => {
    it('should create user successfully', async () => {
      const dto: RegisterDto = {
        id: 1,
        email: 'test@example.com',
        password: plainPassword,
        name: 'Test',
        phoneNumber: 1234567890,
      };

      userService.create.mockResolvedValue(Result.ok({ ...dto }));

      const result = await authService.register(dto);
      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.value?.email).toBe(dto.email);
      }
    });

    it('should return fail if user creation fails', async () => {
      const dto: RegisterDto = {
        id: 1,
        email: 'test@example.com',
        password: plainPassword,
        name: 'Test',
        phoneNumber: 1234567890,
      };

      userService.create.mockResolvedValue(Result.fail('Error al crear usuario'));

      const result = await authService.register(dto);
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Error al crear usuario');
    });
  });
});
