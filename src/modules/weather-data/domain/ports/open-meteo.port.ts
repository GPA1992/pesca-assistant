import { WeatherHourlyData } from '../types/weather-api-response';
import { WeatherQueryParams } from '../types/weather-query-params';

export interface OpenMeteoPort {
  getTemperature(params: WeatherQueryParams): Promise<WeatherHourlyData>;
  getHumidity(params: WeatherQueryParams): Promise<WeatherHourlyData>;
  getPressure(params: WeatherQueryParams): Promise<WeatherHourlyData>;
  getWindSpeed(params: WeatherQueryParams): Promise<WeatherHourlyData>;
}
