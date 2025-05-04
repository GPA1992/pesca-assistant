import { Module } from '@nestjs/common';
import { OpenMeteoProvider } from './infrastructure/adapters/providers/open-meteo.provider';
import { GetTemperatureUseCase } from './application/use-cases/get-temperature.use-case';
import { GetWeatherDataHandler } from './infrastructure/controllers/handlers/get-weather-data.handler';
import { OPEN_METEO_PROVIDER_TOKEN } from './infrastructure/weather.constants';

@Module({
  providers: [
    {
      provide: OPEN_METEO_PROVIDER_TOKEN,
      useClass: OpenMeteoProvider,
    },
    GetTemperatureUseCase,
    OpenMeteoProvider,
  ],
  controllers: [GetWeatherDataHandler],
  exports: [GetTemperatureUseCase],
})
export class WeatherDataModule {}
