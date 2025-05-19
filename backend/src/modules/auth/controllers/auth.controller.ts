import { AuthService } from '../service/auth.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Result } from '../../../common/result/result';
import { LoginDto } from '../dto/login-auth.dto';
import { RegisterDto } from '../dto/register-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<Result<any>> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<Result<{ access_token: string }>> {
    return this.authService.login(dto.userId, dto.password);
  }


} 