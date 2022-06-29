import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any {
    return req.user;
  }

  @Get('protected')
  getHello(): string {
    return this.appService.getHello();
  }
}
