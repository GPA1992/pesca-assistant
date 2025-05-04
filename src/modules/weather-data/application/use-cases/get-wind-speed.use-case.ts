import { Injectable, Inject } from '@nestjs/common';
import { WeatherParamsDto } from '../dtos/weather-params.dto';
import { OpenMeteoPort } from '../../domain/ports/open-meteo.port';
import { OPEN_METEO_PROVIDER_TOKEN } from '../../infrastructure/weather.constants';
import { WeatherHourlyData } from '../../domain/types/weather-api-response';

@Injectable()
export class GetWindSpeedUseCase {
  constructor(
    @Inject(OPEN_METEO_PROVIDER_TOKEN)
    private readonly provider: OpenMeteoPort,
  ) {}

  async execute(params: WeatherParamsDto): Promise<WeatherHourlyData> {
    return await this.provider.getWindSpeed(params);
  }
}
