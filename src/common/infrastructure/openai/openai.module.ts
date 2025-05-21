import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { openAiProvider } from './openai.provider';

@Module({
  providers: [OpenAiService, openAiProvider],
  exports: [OpenAiService, openAiProvider],
})
export class OpenAiModule {}
