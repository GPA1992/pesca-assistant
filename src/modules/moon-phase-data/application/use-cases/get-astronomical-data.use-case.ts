import { Inject } from '@nestjs/common';
import { VisualCrossingAstronomyDataEntity } from '../../domain/entities/visual-crossing-astronomy-data.entity';
import { VisualCrossingAstronomyPort } from '../../domain/ports/visual-crossing-weather.port';
import { VISUAL_CROSSING_ASTRONOMY_PROVIDER } from '../../infrastructure/moon-phase.constants';
import { MoonPhaseQueryParams } from '../../domain/types/moon-phases-query-params';
import { DailyResponseData } from '../../domain/types/day-response';

export class GetAstronomicalDataUseCase {
  constructor(
    @Inject(VISUAL_CROSSING_ASTRONOMY_PROVIDER)
    private readonly astronomyPort: VisualCrossingAstronomyPort,
  ) {}

  async execute(
    params: MoonPhaseQueryParams,
  ) /* : Promise<DailyResponseData<VisualCrossingAstronomyDataEntity>> */ {
    return await this.astronomyPort.getAstronomicalData(params);
  }
}
