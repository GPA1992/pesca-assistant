import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  getHello(): string {
    return 'Hello World!';
  }

  async set(key: string, value: string, ttlSeconds = 3600) {
    await this.redis.set(key, value, 'EX', ttlSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
}
