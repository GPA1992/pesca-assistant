import { Injectable } from '@nestjs/common';
import { WeatherProviderPort } from '../../../domain/ports/weather-provider.port';
import { WeatherQueryParams } from '../../../domain/types/weather-query-params';

@Injectable()
export class InmetProvider implements WeatherProviderPort {
  async getTemperature(params: WeatherQueryParams): Promise<number> {
    return 24.3; // mock
  }

  async getHumidity(params: WeatherQueryParams): Promise<number> {
    return 75;
  }

  async getPressure(params: WeatherQueryParams): Promise<number> {
    return 1010;
  }

  async getWindSpeed(params: WeatherQueryParams): Promise<number> {
    return 4.5;
  }
}
