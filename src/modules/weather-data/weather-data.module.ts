import { Module } from '@nestjs/common';
import { GetTemperatureUseCase } from './application/use-cases/get-temperature.use-case';
import { OPEN_METEO_PROVIDER_TOKEN } from './infrastructure/weather.constants';
import { GetTemperatureHandler } from './infrastructure/controllers/handlers/get-temperature.handler';
import { GetHumidityHandler } from './infrastructure/controllers/handlers/get-humidity.handler';
import { GetPressureHandler } from './infrastructure/controllers/handlers/get-pressure.handler';
import { GetWindSpeedHandler } from './infrastructure/controllers/handlers/get-wind-speed.handler';
import { GetHumidityUseCase } from './application/use-cases/get-humidity.use-case';
import { GetPressureUseCase } from './application/use-cases/get-pressure.use-case';
import { GetWindSpeedUseCase } from './application/use-cases/get-wind-speed.use-case';
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

    GetTemperatureUseCase,
    GetHumidityUseCase,
    GetPressureUseCase,
    GetWindSpeedUseCase,
    OpenMeteoProvider,
    GetRainDataUseCase,
    GetAllWeatherDataUseCase,
  ],
  controllers: [
    GetTemperatureHandler,
    GetHumidityHandler,
    GetPressureHandler,
    GetWindSpeedHandler,
    GetRainDataHandler,
    GetAllWeatherDataHandler,
  ],
  exports: [GetTemperatureUseCase],
})
export class WeatherDataModule {}
