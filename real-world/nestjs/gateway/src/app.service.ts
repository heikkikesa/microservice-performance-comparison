import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('UNIVERSITIES_SERVICE') private readonly client: ClientProxy,
  ) {}

  getUniversities(country: string | null) {
    const data = country !== undefined ? country : '';
    return this.client.send({ cmd: 'message' }, data);
  }
}
