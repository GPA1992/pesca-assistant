import { Injectable, Inject } from '@nestjs/common';
import { WEATHER_PROVIDER_TOKEN } from '../../infrastructure/weather.constants';
import { WeatherProviderPort } from '../../domain/ports/weather-provider.port';
import { WeatherParamsDto } from '../dtos/weather-params.dto';

@Injectable()
export class GetTemperatureUseCase {
  constructor(
    @Inject(WEATHER_PROVIDER_TOKEN)
    private readonly provider: WeatherProviderPort,
  ) {}

  async execute(params: WeatherParamsDto): Promise<number> {
    return await this.provider.getTemperature(params);
  }
}
