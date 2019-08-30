import { Controller, Get, Query } from '@nestjs/common';
import TestService from './Test.service';

@Controller('api/test')
export default class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('analysis')
  async analysis(@Query() params): Promise<Object> {
    try {
      const id = await this.testService.analysis(params.url);
      return {
        code: 0,
        data: { id },
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }

  @Get('result')
  async getResult(@Query() params): Promise<Object> {
    try {
      const data = await this.testService.getResult(params.id);
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
