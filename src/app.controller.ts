import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('default/index.ejs')
  getHello(): any {
    // return {};
    return { name: 'NestJs' };
    // return this.appService.getHello();
  }
}
