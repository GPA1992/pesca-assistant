import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisIndexService implements OnModuleInit {
  private readonly logger = new Logger(RedisIndexService.name);
  private readonly indexName = 'idx:docs_v1';
  private readonly aliasName = 'idx:docs_current';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async onModuleInit() {
    await this.createIndexIfNotExists();
  }

  private async createIndexIfNotExists() {
    try {
      await this.redis.call(
        'FT.CREATE',
        this.indexName,
        'ON',
        'HASH',
        'PREFIX',
        '1',
        'doc:',
        'SCHEMA',
        'content',
        'TEXT',
        'embedding',
        'VECTOR',
        'FLAT',
        '6',
        'TYPE',
        'FLOAT32',
        'DIM',
        '1536',
        'DISTANCE_METRIC',
        'COSINE',
      );

      this.logger.log(`Índice ${this.indexName} criado com sucesso.`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg.includes('Index already exists')) {
        this.logger.log(`Índice ${this.indexName} já existe, prosseguindo.`);
      } else {
        this.logger.error('Erro ao criar índice Redis:', err);
        throw err;
      }
    }

    await this.updateAlias();
  }

  private async updateAlias() {
    try {
      await this.redis.call('FT.ALIASUPDATE', this.aliasName, this.indexName);
      this.logger.log(
        `Alias ${this.aliasName} atualizado para ${this.indexName}.`,
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg.includes('Alias does not exist')) {
        await this.redis.call('FT.ALIASADD', this.aliasName, this.indexName);
        this.logger.log(
          `Alias ${this.aliasName} criado e apontando para ${this.indexName}.`,
        );
      } else {
        this.logger.error('Erro ao atualizar alias Redis:', err);
        throw err;
      }
    }
  }
}
