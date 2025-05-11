import { VisualCrossingAstronomyDataEntity } from '../../domain/entities/visual-crossing-astronomy-data.entity';
import { VisualCrossingAstronomyPort } from '../../domain/ports/visual-crossing-weather.port';
import { DailyResponseData } from '../../domain/types/day-hourly-response';

import { WeatherQueryParams } from '../../domain/types/weather-query-params';

export class GetAstronomicalDataUseCase {
  constructor(private readonly astronomyPort: VisualCrossingAstronomyPort) {}

  async execute(
    params: WeatherQueryParams,
  ): Promise<DailyResponseData<VisualCrossingAstronomyDataEntity>> {
    return await this.astronomyPort.getAstronomicalData(params);
  }
}
