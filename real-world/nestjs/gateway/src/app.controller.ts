import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private service: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/universities')
  getUniversities(@Query('country') country: string) {
    return this.service.getUniversities(country);
  }
}
