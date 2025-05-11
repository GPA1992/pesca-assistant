import { Controller, Get, Query } from '@nestjs/common';
import { GetAstronomicalDataUseCase } from '../../../application/use-cases/get-astronomical-data.use-case';

import { VisualCrossingAstronomyDataEntity } from '../../../domain/entities/visual-crossing-astronomy-data.entity';
import { DailyResponseData } from 'src/modules/weather-data/domain/types/day-hourly-response';
import { MoonQueryParamsDto } from '../dtos/get-moon-phases-data.query.dto';

@Controller('weather-data/astronomy')
export class GetAstronomicalDataHandler {
  constructor(
    private readonly getAstronomicalDataUseCase: GetAstronomicalDataUseCase,
  ) {}

  @Get()
  async handle(
    @Query() query: MoonQueryParamsDto,
  ): Promise<DailyResponseData<VisualCrossingAstronomyDataEntity>> {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(parseInt(query.targetMonth) - 1);
    date.setUTCDate(parseInt(query.targetDay));
    date.setUTCHours(parseInt(query.targetHour), 0, 0, 0);

    return await this.getAstronomicalDataUseCase.execute({
      latitude: query.latitude,
      longitude: query.longitude,
      datetime: date,
    });
  }
}
