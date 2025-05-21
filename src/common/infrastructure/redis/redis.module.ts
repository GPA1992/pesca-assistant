import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { RedisIndexService } from './redis-index.service';

@Module({
  imports: [
    NestRedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
  ],
  providers: [RedisIndexService],
  exports: [NestRedisModule, RedisIndexService],
})
export class RedisModule {}
