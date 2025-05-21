import { Module } from '@nestjs/common';
import { GetAstronomicalDataHandler } from './infrastructure/controllers/handlers/get-astronomical-data.handler';
import { GetAstronomicalDataUseCase } from './application/use-cases/get-astronomical-data.use-case';
import { VISUAL_CROSSING_ASTRONOMY_PROVIDER } from './infrastructure/moon-phase.constants';
import { VisualCrossingAstronomyProvider } from './infrastructure/adapters/providers/visual-crossing-api/visual-crossing-astronomy.provider';

@Module({
  providers: [
    {
      provide: VISUAL_CROSSING_ASTRONOMY_PROVIDER,
      useClass: VisualCrossingAstronomyProvider,
    },
    GetAstronomicalDataUseCase,
  ],
  controllers: [GetAstronomicalDataHandler],
  exports: [
    {
      provide: VISUAL_CROSSING_ASTRONOMY_PROVIDER,
      useClass: VisualCrossingAstronomyProvider,
    },
    GetAstronomicalDataUseCase,
  ],
})
export class MoonPhasesDataModule {}
