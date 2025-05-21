import { Controller, Get, Query } from '@nestjs/common';
import { WeatherQueryParamsDto } from '../dtos/get-weather-data.query.dto';

import { GetAllWeatherDataUseCase } from 'src/modules/weather-data/application/use-cases/get-all-weather-data.use-case';

@Controller('weather')
export class GetAllWeatherDataHandler {
  constructor(
    private readonly getAllWeatherDataUseCase: GetAllWeatherDataUseCase,
  ) {}

  @Get('data')
  async handle(@Query() query: WeatherQueryParamsDto) {
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
