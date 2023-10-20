## Description
- Code-First w/ [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- 🔐 JWT authentication w/ [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- REST API docs w/ [Swagger](https://swagger.io/)

## Project Detail
- frienchelin backend api server

## Installation
### step 1
```bash
# npm
npm i -g @nestjs/cli
# yarn
yarn add -g @nestjs/cli
```
### step 2
```bash
# npm
npm install
# yarn
yarn install
```
### step 3 (Postgresql Install)
```bash
docker-compose -f docker-compose.db.yml up -d
# or
npm run docker:db
```
### step 4 (Prisma Migrate)
```bash
## migrate ./prisma/schema.prisma 의 기본 테이블 마이그레이션
npx prisma migrate dev --name "init" 
# or
npm run migrate:dev
```
If you like to customize your `migration.sql` file run the following command. After making your customizations run `npx prisma migrate dev` to apply it.

```bash
# TODO 추후 초기데이터 마이그레이션 및 이니셜라이즈 추가 필요
npx prisma migrate dev --create-only
# or
npm run migrate:dev:create
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```