import { RainData } from '../entities/rain-data.entity';
import { WeatherData } from '../entities/weather-data.entity';
import { HourlyResponseData } from '../types/day-hourly-response';
import { WeatherQueryParams } from '../types/weather-query-params';

export interface OpenMeteoPort {
  getRainData(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<RainData>>;
  getAllWeatherData(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherData>>;
}
