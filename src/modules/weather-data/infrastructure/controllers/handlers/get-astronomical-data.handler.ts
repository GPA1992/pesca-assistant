import { Controller, Get, Query } from '@nestjs/common';
import { GetAstronomicalDataUseCase } from '../../../application/use-cases/get-astronomical-data.use-case';

import { VisualCrossingAstronomyDataEntity } from '../../../domain/entities/visual-crossing-astronomy-data.entity';
import { WeatherQueryParams } from '../../../domain/types/weather-query-params';
import { DailyResponseData } from 'src/modules/weather-data/domain/types/day-hourly-response';

@Controller('weather-data/astronomy')
export class GetAstronomicalDataHandler {
  constructor(
    private readonly getAstronomicalDataUseCase: GetAstronomicalDataUseCase,
  ) {}

  @Get()
  async handle(
    @Query() query: Record<string, string>,
  ): Promise<DailyResponseData<VisualCrossingAstronomyDataEntity>> {
    const params: WeatherQueryParams = {
      latitude: parseFloat(query.latitude),
      longitude: parseFloat(query.longitude),
      datetime: new Date(query.datetime),
    };

    return this.getAstronomicalDataUseCase.execute(params);
  }
}
