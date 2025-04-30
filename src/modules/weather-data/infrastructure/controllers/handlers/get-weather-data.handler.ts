import { Controller, Get, Query } from '@nestjs/common';
import { GetTemperatureUseCase } from '../../../application/use-cases/get-temperature.use-case';
import { WeatherParamsDto } from '../../../application/dtos/weather-params.dto';

@Controller('weather')
export class GetWeatherDataHandler {
  constructor(private readonly getTemperatureUseCase: GetTemperatureUseCase) {}

  @Get('temperature')
  async handle(@Query() query: WeatherParamsDto) {
    const temperature = await this.getTemperatureUseCase.execute(query);
    console.log('Temperature:', temperature);

    return { temperature };
  }
}
