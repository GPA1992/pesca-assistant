import { RainHourlyDataEntity } from '../../infrastructure/adapters/providers/entities/rain-hourly.entity';
import { WeatherHourlyDataEntity } from '../../infrastructure/adapters/providers/entities/weather-hourly.entity';
import { HourlyResponseData } from '../types/day-hourly-response';

import { WeatherQueryParams } from '../types/weather-query-params';

export interface OpenMeteoPort {
  getTemperature(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataEntity>>;
  getHumidity(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataEntity>>;
  getPressure(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataEntity>>;
  getWindSpeed(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherHourlyDataEntity>>;
  getRainData(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<RainHourlyDataEntity>>;
}
