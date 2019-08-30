import * as express from 'express';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OUTPUT_PATH } from '../config';

@Module({})
export default class StaticModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(express.static(OUTPUT_PATH)).forRoutes('output');
  }
}
