import { Inject } from '@nestjs/common';
import { OpenAI } from 'openai';

export const InjectOpenAI = () => Inject('OPENAI_CLIENT');

export const openAiProvider = {
  provide: 'OPENAI_CLIENT',
  useFactory: () => {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  },
};
