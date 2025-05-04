import { Controller, Get, Query } from '@nestjs/common';
import { GetWindSpeedUseCase } from '../../../application/use-cases/get-wind-speed.use-case';
import { WeatherQueryParamsDto } from '../dtos/get-weather-data.query.dto';

@Controller('weather')
export class GetWindSpeedHandler {
  constructor(private readonly useCase: GetWindSpeedUseCase) {}

  @Get('wind')
  async handle(@Query() query: WeatherQueryParamsDto) {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(parseInt(query.targetMonth) - 1);
    date.setUTCDate(parseInt(query.targetDay));
    date.setUTCHours(parseInt(query.targetHour), 0, 0, 0);
    const windSpeed = await this.useCase.execute({
      latitude: query.latitude,
      longitude: query.longitude,
      datetime: date,
    });
    return { windSpeed };
  }
}
