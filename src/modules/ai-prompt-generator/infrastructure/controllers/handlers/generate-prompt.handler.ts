import { Controller, Get, Query } from '@nestjs/common';
import { GenerateFishingPromptUseCase } from '../../../application/use-cases/generate-fishing-prompt.use-case';

import { GenerateFishingPromptQueryDto } from '../dtos/generate-prompt.query.dto';

@Controller('ai')
export class GenerateFishingPromptHandler {
  constructor(private readonly generatePrompt: GenerateFishingPromptUseCase) {}

  @Get('generate-prompt')
  async handle(@Query() query: GenerateFishingPromptQueryDto) {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(parseInt(query.targetMonth) - 1);
    date.setUTCDate(parseInt(query.targetDay));
    date.setUTCHours(parseInt(query.targetHour), 0, 0, 0);
    const result = await this.generatePrompt.execute({
      date: date,
      latitude: query.latitude,
      longitude: query.longitude,
      timezone: query.timezone,
    });

    return result;
  }
}
