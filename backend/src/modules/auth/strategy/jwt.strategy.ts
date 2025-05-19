import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'jwt-secret',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('JWT Payload en validate:', payload);
    const userId = Number(payload.sub); 
    console.log('Buscando usuario con ID:', userId);
    const userResult = await this.authRepository.findByUserId(userId);
    if (!userResult.isSuccess) throw new UnauthorizedException('User not found');
    return userResult.value;
  }
  
}