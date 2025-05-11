import { Inject, Injectable } from '@nestjs/common';
import { OpenMeteoPort } from '../../domain/ports/open-meteo.port';
import { WeatherQueryParams } from '../../domain/types/weather-query-params';
import { WeatherDataByHour } from '../../domain/types/weather-data-by-hour';
import { HourlyResponseData } from '../../domain/types/day-hourly-response';
import { OPEN_METEO_PROVIDER_TOKEN } from '../../infrastructure/weather.constants';

@Injectable()
export class GetAllWeatherDataUseCase {
  constructor(
    @Inject(OPEN_METEO_PROVIDER_TOKEN)
    private readonly provider: OpenMeteoPort,
  ) {}

  async execute(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherDataByHour>> {
    return await this.provider.getAllWeatherData(params);
  }
}
