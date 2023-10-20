import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SecurityConfig } from '../common/configs/config.interface';
import { UsersService } from "../users/users.service";
import { JwtKakaoStrategy } from "../common/auth/jwt-social-kakao.strategy";
import { AuthController } from "./auth.controller";
import { JwtGoogleStrategy } from "../common/auth/jwt-social-google.strategy";
import { UsersModule } from "../users/users.module";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtKakaoStrategy,
    JwtGoogleStrategy,
    PasswordService,
    UsersService,
  ],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
