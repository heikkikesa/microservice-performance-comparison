import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('HELLO_WORLD_SERVICE') private readonly client: ClientProxy,
  ) {}

  getHello() {
    return this.client.send({ cmd: 'message' }, '');
  }
}
