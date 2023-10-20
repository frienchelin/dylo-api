import { Controller, forwardRef, Get, Inject, Logger, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../auth/auth.service";

interface IOAuthUser {	//interface 설정
  user: {
    name: string;
    email: string;
    password: string;
  };
}

@ApiTags('user')
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/user/friends')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getUserFriends() {
    return "라라라랄랄~~"
  }
  /**
  * social login test api
  * */
  @Get("/user/login/google")	//restAPI만들기. 엔드포인트는 /login/google.
  @UseGuards(AuthGuard("google"))	//인증과정을 거쳐야하기때문에 UseGuards를 써주고 passport인증으로 AuthGuard를 써준다. 이름은 google로
  async loginGoogle(
    @Req() req: Request & IOAuthUser,
    @Res() res: Response	//Nest.js가 express를 기반으로 하기때문에 Request는 express에서 import한다.
  ) {
    //프로필을 받아온 다음, 로그인 처리해야하는 곳(auth.service.ts에서 선언해준다)
    Logger.log("login/google")
    return await this.authService.OAuthLogin({ req, res });
  }
  @Get("/user/login/kakao")
  @UseGuards(AuthGuard("kakao"))
  async loginKakao(
    @Req() req: Request & IOAuthUser,
    @Res() res: Response
  ) {
    Logger.log("login/kakao")
    return await this.authService.OAuthLogin({ req, res });
  }

  @Get("/user/login/apple")
  @UseGuards(AuthGuard("apple"))
  async loginApple(
    @Req() req: Request & IOAuthUser,
    @Res() res: Response
  ) {
    Logger.log("login/apple")
    return await this.authService.OAuthLogin({ req, res });
  }

  @Get("/user/login/naver")
  @UseGuards(AuthGuard("naver"))
  async loginNaver(
    @Req() req: Request & IOAuthUser,
    @Res() res: Response
  ) {
    Logger.log("login/naver")
    return await this.authService.OAuthLogin({ req, res });
  }

  //login 성공 시, redirect를 수행할 라우트 핸들러
  @Get('/google/redirect')
  @UseGuards(AuthGuard("google"))
  async handleGoogleRedirect(
    @Req() req: any,
  ) {
    Logger.log("google/redirect")
    return req.user;
  }

  @Get('/kakao/redirect')
  @UseGuards(AuthGuard("kakao"))
  async handleKakaoRedirect(
    @Req() req: any,
  ) {
    Logger.log("kakao/redirect")
    return req.user;
  }

  @Get('/naver/redirect')
  @UseGuards(AuthGuard("naver"))
  async handleNaverRedirect(
    @Req() req: any,
  ) {
    Logger.log("naver/redirect")
    return req.user;
  }

  @Get('/apple/redirect')
  @UseGuards(AuthGuard("apple"))
  async handleAppleRedirect(
    @Req() req: any,
  ) {
    Logger.log("apple/redirect")
    return req.user;
  }

}
