import { RainHourlyDataInterface } from '../../infrastructure/adapters/providers/entities/rain-hourly.entity';
import { WeatherHourlyDataInterface } from '../../infrastructure/adapters/providers/entities/weather-hourly.entity';
import { HourlyResponseData } from '../types/day-hourly-response';

import { WeatherQueryParams } from '../types/weather-query-params';

export interface OpenMeteoPort {
  getTemperature(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataInterface>>;
  getHumidity(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataInterface>>;
  getPressure(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataInterface>>;
  getWindSpeed(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataInterface>>;
  getRainData(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<RainHourlyDataInterface>>;
}
