import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pdf')
  async getPdf(@Res() res: Response) {
    return await this.appService.getPdf(res);
  }
}
