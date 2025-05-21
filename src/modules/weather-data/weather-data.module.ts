import { Module } from '@nestjs/common';
import { OPEN_METEO_PROVIDER_TOKEN } from './infrastructure/weather.constants';
import { GetRainDataUseCase } from './application/use-cases/get-rain-data.use-case';
import { GetRainDataHandler } from './infrastructure/controllers/handlers/get-raind-data.handler';
import { OpenMeteoProvider } from './infrastructure/adapters/providers/weather-api/open-meteo.provider';
import { GetAllWeatherDataHandler } from './infrastructure/controllers/handlers/get-all-weather.handler';
import { GetAllWeatherDataUseCase } from './application/use-cases/get-all-weather-data.use-case';

@Module({
  providers: [
    {
      provide: OPEN_METEO_PROVIDER_TOKEN,
      useClass: OpenMeteoProvider,
    },

    OpenMeteoProvider,
    GetRainDataUseCase,
    GetAllWeatherDataUseCase,
  ],
  controllers: [GetRainDataHandler, GetAllWeatherDataHandler],
  exports: [OpenMeteoProvider, GetRainDataUseCase, GetAllWeatherDataUseCase],
})
export class WeatherDataModule {}
