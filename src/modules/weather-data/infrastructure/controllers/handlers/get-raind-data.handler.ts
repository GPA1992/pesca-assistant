import { Controller, Get, Query } from '@nestjs/common';
import { GetRainDataUseCase } from '../../../application/use-cases/get-rain-data.use-case';
import { WeatherQueryParamsDto } from '../dtos/get-weather-data.query.dto';

@Controller('weather')
export class GetRainDataHandler {
  constructor(private readonly useCase: GetRainDataUseCase) {}

  @Get('rain')
  async handle(@Query() query: WeatherQueryParamsDto) {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(parseInt(query.targetMonth) - 1);
    date.setUTCDate(parseInt(query.targetDay));
    date.setUTCHours(parseInt(query.targetHour), 0, 0, 0);
    const rainData = await this.useCase.execute({
      latitude: query.latitude,
      longitude: query.longitude,
      datetime: date,
    });
    return { rainData };
  }
}
