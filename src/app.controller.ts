import { Controller, Get } from '@nestjs/common';
import { HealthResponse } from './app.interface';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HealthResponse {
    return this.appService.getHello();
  }
}
