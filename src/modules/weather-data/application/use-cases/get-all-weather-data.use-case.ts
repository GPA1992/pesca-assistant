import { Inject, Injectable } from '@nestjs/common';
import { OpenMeteoPort } from '../../domain/ports/open-meteo.port';
import { WeatherQueryParams } from '../../domain/types/weather-query-params';
import { HourlyResponseData } from '../../domain/types/day-hourly-response';
import { OPEN_METEO_PROVIDER_TOKEN } from '../../infrastructure/weather.constants';
import { WeatherData } from '../../domain/entities/weather-data.entity';

@Injectable()
export class GetAllWeatherDataUseCase {
  constructor(
    @Inject(OPEN_METEO_PROVIDER_TOKEN)
    private readonly provider: OpenMeteoPort,
  ) {}

  async execute(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherData>> {
    return await this.provider.getAllWeatherData(params);
  }
}
