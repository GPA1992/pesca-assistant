import { Module } from '@nestjs/common';
import { IngestionController } from './infrastructure/controllers/ingestion.controller';
import { IngestDocumentsUseCase } from './application/use-cases/ingest-documents.use-case';
import { EmbeddingIndexerService } from './infrastructure/services/embedding-indexer.service';
import { MarkdownReaderAdapter } from './infrastructure/adapters/markdown-reader.adapter';
import { RedisModule } from 'src/common/infrastructure/redis/redis.module';
import { OpenAiModule } from 'src/common/infrastructure/openai/openai.module';

@Module({
  imports: [RedisModule, OpenAiModule],
  controllers: [IngestionController],
  providers: [
    IngestDocumentsUseCase,
    EmbeddingIndexerService,
    MarkdownReaderAdapter,
  ],
})
export class DocumentIngestionModule {}
