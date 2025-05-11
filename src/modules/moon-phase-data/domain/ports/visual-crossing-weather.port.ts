import { VisualCrossingAstronomyDataEntity } from '../entities/visual-crossing-astronomy-data.entity';
import { DailyResponseData } from '../types/day-response';
import { MoonPhaseQueryParams } from '../types/moon-phases-query-params';

export interface VisualCrossingAstronomyPort {
  getAstronomicalData(
    params: MoonPhaseQueryParams,
  ) /* : Promise<DailyResponseData<VisualCrossingAstronomyDataEntity>> */;
}
