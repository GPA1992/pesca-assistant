import { WeatherQueryParams } from '../types/weather-query-params';

export interface WeatherProviderPort {
  getTemperature(params: WeatherQueryParams): Promise<number>;
  getHumidity(params: WeatherQueryParams): Promise<number>;
  getPressure(params: WeatherQueryParams): Promise<number>;
  getWindSpeed(params: WeatherQueryParams): Promise<number>;
}
