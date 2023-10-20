import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/health-check')
  @HttpCode(HttpStatus.OK)
  healthCheck(): string {
    return this.appService.getHealthCheck();
  }
}
