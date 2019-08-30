import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

const CONTEXT = fs.realpathSync(process.cwd());

@Module({})
export default class StaticModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(path.resolve(CONTEXT, 'target')))
      .forRoutes('static');
  }
}
