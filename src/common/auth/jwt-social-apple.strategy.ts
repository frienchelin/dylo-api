import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-apple";

export class JwtAppleStrategy extends PassportStrategy(Strategy, "apple") {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: process.env.APPLE_CALL_BACK_URL,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: `-----BEGIN PRIVATE KEY-----
                          MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgXITBigCW+l0y3QFZ
                          Clplfglt8IHVo/UwnkasdasdasdasdasdDsQg5w3ifZt7IsnztEsm1CVW3K
                          5nGemxkW
                          -----END PRIVATE KEY-----`,
      passReqToCallback: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('accessToken'+accessToken)
    console.log('refreshToken'+refreshToken)
    console.log(profile)
    //console.log(profile._json.kakao_account.email)

    return {
      name: profile.displayName,
      email: profile,
      password: profile.id,
    };
  }
}