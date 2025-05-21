import { Controller, Post } from '@nestjs/common';
import { IngestDocumentsUseCase } from '../../application/use-cases/ingest-documents.use-case';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestUseCase: IngestDocumentsUseCase) {}

  @Post('run')
  async ingest() {
    await this.ingestUseCase.execute();
    return { message: 'Ingestão de documentos concluída.' };
  }
}
