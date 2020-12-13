import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TZ } from './localDb/TZ';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `Hello,NestJs we call method =>this.appService.getHello()
    Time: ${new Date()}
    TZ: ${TZ}
     =>Db https://cloud.mongodb.com/`;
  }
}
