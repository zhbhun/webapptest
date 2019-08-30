import { Module } from '@nestjs/common';
import TestModule from './test/Test.module';
import StaticModule from './static/Static.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [StaticModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
