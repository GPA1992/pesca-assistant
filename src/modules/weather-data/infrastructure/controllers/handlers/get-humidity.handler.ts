import { Controller, Get, Query } from '@nestjs/common';
import { GetHumidityUseCase } from '../../../application/use-cases/get-humidity.use-case';
import { WeatherQueryParamsDto } from '../dtos/get-weather-data.query.dto';

@Controller('weather')
export class GetHumidityHandler {
  constructor(private readonly useCase: GetHumidityUseCase) {}

  @Get('humidity')
  async handle(@Query() query: WeatherQueryParamsDto) {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(parseInt(query.targetMonth) - 1);
    date.setUTCDate(parseInt(query.targetDay));
    date.setUTCHours(parseInt(query.targetHour), 0, 0, 0);
    const humidity = await this.useCase.execute({
      latitude: query.latitude,
      longitude: query.longitude,
      datetime: date,
    });
    return { humidity };
  }
}
