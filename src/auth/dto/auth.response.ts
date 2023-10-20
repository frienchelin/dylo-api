import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SocialLoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rrb2Fza2RvYXMiLCJpYXQiOjE2OTY5MzAzMDMsImV4cCI6MTY5NjkzMDQyM30.FCdVBXpPpcjarcXIiAfSIYp-txWslUJvLSFZmOFn6dQ"',
    description: 'access_token',
    required: true,
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rrb2Fza2RvYXMiLCJpYXQiOjE2OTY5MzAzMDMsImV4cCI6MTY5NzUzNTEwM30.rhtJlwuROXXyKVd44YXnfg6sfg5LdKD99PuOKjjvD4c',
    description: 'refresh_token',
    required: true,
  })
  @IsString()
  refresh_token: string;
}