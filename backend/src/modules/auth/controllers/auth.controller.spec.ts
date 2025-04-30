import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { Result } from '../../../common/result/result';
import { RegisterDto } from '../dto/register-auth.dto';
import { LoginDto } from '../dto/login-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(() => {
    authService = {
      register: jest.fn(),
      login: jest.fn(),
      validateUser: jest.fn(), 
    } as unknown as jest.Mocked<AuthService>;

    controller = new AuthController(authService);
  });

  describe('register', () => {
    it('should return success on successful registration', async () => {
      const dto: RegisterDto = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        name: 'Test User',
        phoneNumber: 1234567890,
      };

      const expectedResult: Result<any> = Result.ok({ ...dto });
      authService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(dto);

      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.value?.email).toBe(dto.email);
      }
    });

    it('should return fail on registration error', async () => {
      const dto: RegisterDto = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        name: 'Test User',
        phoneNumber: 1234567890,
      };

      const expectedResult: Result<any> = Result.fail('Error de registro');
      authService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(dto);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Error de registro');
    });
  });

  describe('login', () => {
    it('should return success on valid credentials', async () => {
      const dto: LoginDto = { id: 1, password: '123456' };

      const expectedResult: Result<{ access_token: string }> = Result.ok({ access_token: 'mock_token' });
      authService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(dto);

      expect(authService.login).toHaveBeenCalledWith(dto.id, dto.password);
      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.value?.access_token).toBe('mock_token');
      }
    });

    it('should return fail on login error', async () => {
      const dto: LoginDto = { id: 1, password: 'wrongpassword' };

      const expectedResult: Result<{ access_token: string }> = Result.fail('Credenciales inválidas');
      authService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(dto);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe('Credenciales inválidas');
    });
  });
});
