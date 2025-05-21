import { Module } from '@nestjs/common';
import { GenerateFishingPromptUseCase } from './application/use-cases/generate-fishing-prompt.use-case';
import { GenerateFishingPromptHandler } from './infrastructure/controllers/handlers/generate-prompt.handler';
import { SolunarPeriodsModule } from '../solunar-periods/solunar-periods.module';
import { MoonPhasesDataModule } from '../moon-phase-data/moon-phase-.module';
import { WeatherDataModule } from '../weather-data/weather-data.module';

@Module({
  imports: [SolunarPeriodsModule, MoonPhasesDataModule, WeatherDataModule],
  controllers: [GenerateFishingPromptHandler],
  providers: [GenerateFishingPromptUseCase],
})
export class AiPromptGeneratorModule {}
