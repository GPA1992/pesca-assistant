import { VisualCrossingAstronomyDataEntity } from '../entities/visual-crossing-astronomy-data.entity';

export interface MoonPhaseDataResponse {
  daily: VisualCrossingAstronomyDataEntity[];
  targetDay: VisualCrossingAstronomyDataEntity;
}
