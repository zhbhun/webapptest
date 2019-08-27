import { Controller, Get, Param } from '@nestjs/common';
import TestService from './Test.service';

@Controller('api/test')
export default class AppController {
  constructor(private readonly testService: TestService) {}

  @Get('run')
  async run(@Param() params): Promise<Object> {
    const pendingCount = this.testService.getPendingCount();
    if (pendingCount > 0) {
      return Promise.resolve({
        code: 409,
        data: pendingCount,
      });
    }
    try {
      const data = await this.testService.runTest(params.url);
      return {
        code: 0,
        data,
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
}
