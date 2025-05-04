import { Controller, Get, Query } from '@nestjs/common';
import { GetPressureUseCase } from '../../../application/use-cases/get-pressure.use-case';
import { WeatherQueryParamsDto } from '../dtos/get-weather-data.query.dto';

@Controller('weather')
export class GetPressureHandler {
  constructor(private readonly useCase: GetPressureUseCase) {}

  @Get('pressure')
  async handle(@Query() query: WeatherQueryParamsDto) {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(parseInt(query.targetMonth) - 1);
    date.setUTCDate(parseInt(query.targetDay));
    date.setUTCHours(parseInt(query.targetHour), 0, 0, 0);
    const pressure = await this.useCase.execute({
      latitude: query.latitude,
      longitude: query.longitude,
      datetime: date,
    });
    return { pressure };
  }
}
