import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { InjectOpenAI } from 'src/common/infrastructure/openai/openai.provider';
import { OpenAI } from 'openai';

@Injectable()
export class EmbeddingIndexerService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectOpenAI() private readonly openai: OpenAI,
  ) {}

  async indexDocument(doc: { id: string; content: string }) {
    const embeddingResp = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: doc.content,
    });

    const embedding = embeddingResp.data[0].embedding;

    const key = `doc:${doc.id}`;

    await this.redis.hset(key, {
      content: doc.content,
      embedding: Buffer.from(new Float32Array(embedding).buffer),
    });
  }
}
