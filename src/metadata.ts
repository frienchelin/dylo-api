/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger/plugin": { "models": [], "controllers": [[import("./app.controller"), { "AppController": { "healthCheck": { type: String } } }], [import("./auth/auth.controller"), { "AuthController": { "socialLogin": {}, "refresh": {}, "logout": {} } }], [import("./users/users.controller"), { "UsersController": { "getUserFriends": { type: String }, "loginGoogle": {}, "loginKakao": {}, "loginApple": {}, "loginNaver": {}, "handleGoogleRedirect": { type: Object }, "handleKakaoRedirect": { type: Object }, "handleNaverRedirect": { type: Object }, "handleAppleRedirect": { type: Object } } }]] }, "@nestjs/graphql/plugin": { "models": [[import("./auth/dto/refresh-token.input"), { "RefreshTokenInput": { token: {} } }], [import("./auth/dto/login.input"), { "LoginInput": { email: {}, password: {} } }], [import("./auth/dto/signup.input"), { "SignupInput": { email: {}, password: {}, firstname: { nullable: true }, lastname: { nullable: true } } }], [import("./common/models/base.model"), { "BaseModel": { id: {}, createdAt: {}, updatedAt: {} } }], [import("./common/pagination/page-info.model"), { "PageInfo": { endCursor: { nullable: true }, hasNextPage: {}, hasPreviousPage: {}, startCursor: { nullable: true } } }], [import("./common/pagination/pagination.args"), { "PaginationArgs": { skip: { nullable: true, type: () => Number }, after: { nullable: true, type: () => String }, before: { nullable: true, type: () => String }, first: { nullable: true, type: () => Number }, last: { nullable: true, type: () => Number } } }]] } };
};