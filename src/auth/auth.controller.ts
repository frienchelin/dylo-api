import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth/auth.service";
import { QueryRequired } from "../common/decorator/required-query.decorator";
import { SocialLoginResponse } from "./dto/auth.response";
import { AuthGuard } from "@nestjs/passport";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Get("/login")
  @ApiQuery({
    name: 'access_token',
    required: true,
    type: String,
    isArray: false,
    description: 'social 로그인 후 발급 받은 토큰'
  })
  @ApiQuery({
    name: 'social_type',
    required: true,
    type: String,
    isArray: false,
    description: 'social type'
  })
  @ApiOkResponse({
    description: '엑세스 토큰, 리프레쉬 토큰 반환',
    type: SocialLoginResponse
  })
  async socialLogin(
    @QueryRequired('access_token') accessTokenFromClient: string,
    @QueryRequired('social_type') socialTypeFromClient: string,
  ) {
    return await this.authService.socialLogin(accessTokenFromClient, socialTypeFromClient)
  }

  //TODO refresh
  @Get('/refresh')
  @ApiQuery({
    name: 'refresh_token',
    required: true,
    type: String,
    isArray: false,
    description: 'frienchelin refresh token',
  })
  @UseGuards(AuthGuard("jwt"))
  async refresh() {

  }

  //TODO logout
  @Post('/logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse()
  async logout() {
    //await this.usersService.removeRefreshToken(jwtPayload.id);
  }

}