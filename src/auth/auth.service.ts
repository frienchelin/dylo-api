import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SecurityConfig } from '../common/configs/config.interface';
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}
  async socialLogin(accessTokenFromClient: string, socialTypeFromClient: string) {

    //TODO
    // 1. social Type 맞게 각 엑세스 토큰을 확인하는 로직 필요.
    // 2. DB 체크 후 유저아이디 존재여부 확인 if(ture) -> generateToken if(false) -> 회원가입 로직

    const user = await this.usersService.checkUser()
    if (user) {
      return await this.generateTokens({userId: accessTokenFromClient})
    }
  }
  async OAuthLogin({ req, res }) {
    const user = await this.usersService.checkUser()
    if (user) {
      return await this.generateTokens({userId: req.user})
    }
  }

  async generateTokens(payload: { userId: string }) {
    const accessToken = await this.generateAccessToken(payload)
    const refreshToken = await this.generateRefreshToken(payload)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }
  async generateAccessToken(payload: { userId: string }): Promise<string> {
    return this.jwtService.sign(payload);
  }
  async generateRefreshToken(payload: { userId: string }): Promise<string> {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

  }

  validateUser(userId: string): Promise<User> {
    console.log("Check userId ::" + userId)
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
