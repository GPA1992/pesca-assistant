import { Controller, Get, Query } from '@nestjs/common';
import { WeatherQueryParamsDto } from '../dtos/get-weather-data.query.dto';

import { WeatherDataByHour } from '../../../domain/types/weather-data-by-hour';
import { GetAllWeatherDataUseCase } from 'src/modules/weather-data/application/use-cases/get-all-weather-data.use-case';
import { HourlyResponseData } from 'src/modules/weather-data/domain/types/day-hourly-response';

@Controller('weather-data')
export class GetAllWeatherDataHandler {
  constructor(
    private readonly getAllWeatherDataUseCase: GetAllWeatherDataUseCase,
  ) {}

  @Get('all')
  async handle(
    @Query() query: WeatherQueryParamsDto,
  ): Promise<HourlyResponseData<WeatherDataByHour>> {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(parseInt(query.targetMonth) - 1);
    date.setUTCDate(parseInt(query.targetDay));
    date.setUTCHours(parseInt(query.targetHour), 0, 0, 0);
    return this.getAllWeatherDataUseCase.execute({
      latitude: query.latitude,
      longitude: query.longitude,
      datetime: date,
    });
  }
}
