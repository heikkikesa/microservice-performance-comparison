import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { randomBytes } from 'crypto';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'message' })
  handleMessage(): string {
    return 'Hello World!';
  }
}
