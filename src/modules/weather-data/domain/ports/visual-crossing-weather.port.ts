import { VisualCrossingAstronomyDataEntity } from '../entities/visual-crossing-astronomy-data.entity';
import { DailyResponseData } from '../types/day-hourly-response';
import { WeatherQueryParams } from '../types/weather-query-params';

export interface VisualCrossingAstronomyPort {
  getAstronomicalData(
    params: WeatherQueryParams,
  ): Promise<DailyResponseData<VisualCrossingAstronomyDataEntity>>;
}
