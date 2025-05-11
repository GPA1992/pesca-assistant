import { Injectable, Inject } from '@nestjs/common';
import { WeatherParamsDto } from '../dtos/weather-params.dto';
import { OpenMeteoPort } from '../../domain/ports/open-meteo.port';
import { OPEN_METEO_PROVIDER_TOKEN } from '../../infrastructure/weather.constants';
import { WeatherHourlyDataInterface } from '../../infrastructure/adapters/providers/entities/weather-hourly.entity';
import { HourlyResponseData } from '../../domain/types/day-hourly-response';

@Injectable()
export class GetTemperatureUseCase {
  constructor(
    @Inject(OPEN_METEO_PROVIDER_TOKEN)
    private readonly provider: OpenMeteoPort,
  ) {}

  async execute(
    params: WeatherParamsDto,
  ): Promise<HourlyResponseData<WeatherHourlyDataInterface>> {
    return await this.provider.getTemperature(params);
  }
}
