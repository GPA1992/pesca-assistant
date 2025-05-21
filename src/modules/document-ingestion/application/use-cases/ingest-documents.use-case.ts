import { Injectable, Logger } from '@nestjs/common';
import { EmbeddingIndexerService } from '../../infrastructure/services/embedding-indexer.service';
import { MarkdownReaderAdapter } from '../../infrastructure/adapters/markdown-reader.adapter';

@Injectable()
export class IngestDocumentsUseCase {
  private readonly logger = new Logger(IngestDocumentsUseCase.name);

  constructor(
    private readonly indexer: EmbeddingIndexerService,
    private readonly reader: MarkdownReaderAdapter,
  ) {}

  async execute() {
    const documents = await this.reader.readAll();

    for (const doc of documents) {
      await this.indexer.indexDocument(doc);
      this.logger.log(`Documento ${doc.id} indexado.`);
    }
  }
}
