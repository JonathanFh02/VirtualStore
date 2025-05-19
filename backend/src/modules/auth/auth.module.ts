import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './repositories/auth.repository';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
          }),
        PassportModule,
        UserModule,
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
              secret: config.get<string>('JWT_SECRET'),
              signOptions: { expiresIn: '1d' },
            }),
            inject: [ConfigService],
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthRepository],
    exports: [AuthService,AuthRepository],
})
export class AuthModule { }
