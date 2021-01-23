import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { randomBytes } from 'crypto';

@Controller()
export class AppController {
  constructor() {}

  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    // generate random bytes to slow down the program
    // const random = randomBytes(32).toString('hex');
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        randomBytes(32).toString('hex');
      }
    }

    // crypto.randomBytes()
    console.log(data.text);
    // console.log(random);
  }
}
