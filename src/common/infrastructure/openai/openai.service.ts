import { Injectable } from '@nestjs/common';
import { InjectOpenAI } from './openai.provider';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  constructor(@InjectOpenAI() private readonly openai: OpenAI) {}

  async embedText(text: string) {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }
}
