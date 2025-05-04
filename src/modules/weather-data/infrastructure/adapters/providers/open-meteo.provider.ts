import { Injectable } from '@nestjs/common';
import { OpenMeteoPort } from '../../../domain/ports/open-meteo.port';
import { WeatherQueryParams } from '../../../domain/types/weather-query-params';

@Injectable()
export class OpenMeteoProvider implements OpenMeteoPort {
  async getTemperature(params: WeatherQueryParams): Promise<number> {
    return 25.5; // mock
  }

  async getHumidity(params: WeatherQueryParams): Promise<number> {
    return 70;
  }

  async getPressure(params: WeatherQueryParams): Promise<number> {
    return 1013;
  }

  async getWindSpeed(params: WeatherQueryParams): Promise<number> {
    return 5.2;
  }
}
