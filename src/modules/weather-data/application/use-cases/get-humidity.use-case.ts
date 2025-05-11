import { Injectable, Inject } from '@nestjs/common';
import { WeatherParamsDto } from '../dtos/weather-params.dto';
import { OpenMeteoPort } from '../../domain/ports/open-meteo.port';
import { OPEN_METEO_PROVIDER_TOKEN } from '../../infrastructure/weather.constants';
import { HourlyResponseData } from '../../domain/types/day-hourly-response';
import { WeatherHourlyDataEntity } from '../../infrastructure/adapters/providers/entities/weather-hourly.entity';

@Injectable()
export class GetHumidityUseCase {
  constructor(
    @Inject(OPEN_METEO_PROVIDER_TOKEN)
    private readonly provider: OpenMeteoPort,
  ) {}

  async execute(
    params: WeatherParamsDto,
  ): Promise<HourlyResponseData<WeatherHourlyDataEntity>> {
    return await this.provider.getHumidity(params);
  }
}
