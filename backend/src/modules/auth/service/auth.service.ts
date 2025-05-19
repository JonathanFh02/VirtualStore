import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../../auth/dto/register-auth.dto';
import { Result } from '../../../common/result/result';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(id: number, password: string): Promise<Result<{ access_token: string }>> {
        const userValidationResult = await this.validateUser(id, password);
      
        if (!userValidationResult.isSuccess) {
          return Result.fail(userValidationResult.error!);
        }
      
        const user = userValidationResult.value!;
      
        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);
      
        return Result.ok({ access_token: accessToken });
      }

    async validateUser(id: number, password: string): Promise<Result<any>> {

        const userResult = await this.userService.findById(id);

        if (!userResult.isSuccess) {
            return Result.fail('Usuario no encontrado');
        }

        const user = userResult.value!;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return Result.fail('Contraseña incorrecta');
        }

        return Result.ok(user);
    }

    async register(dto: RegisterDto): Promise<Result<any>> {
        return this.userService.create(dto);
      }

}