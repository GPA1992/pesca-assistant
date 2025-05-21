import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redis-test')
  async testRedis() {
    await this.redisService.set('test-key', 'Hello, Redis!');
    const value = await this.redisService.get('test-key');
    return { value };
  }
}
