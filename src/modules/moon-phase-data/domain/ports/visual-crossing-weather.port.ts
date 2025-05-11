import { MoonPhaseDataResponse } from '../types/day-response';
import { MoonPhaseQueryParams } from '../types/moon-phases-query-params';

export interface VisualCrossingAstronomyPort {
  getAstronomicalData(
    params: MoonPhaseQueryParams,
  ): Promise<MoonPhaseDataResponse>;
}
