import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private service: AppService) {}

  @MessagePattern({ cmd: 'message' })
  handleMessage(country: string): object {
    return this.service.getUniversities(country);
  }
}
