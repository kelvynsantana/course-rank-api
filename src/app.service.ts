import { Injectable } from '@nestjs/common';
import { HealthResponse, statusType } from './app.interface';

@Injectable()
export class AppService {
  getHello(): HealthResponse {
    return {
      message: '🚀 API  running',
      status: statusType.success,
      error: false,
    };
  }
}
