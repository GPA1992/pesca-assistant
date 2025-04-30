import { Module } from '@nestjs/common';

import { WEATHER_PROVIDER_TOKEN } from './infrastructure/weather.constants';
import { OpenMeteoProvider } from './infrastructure/adapters/providers/open-meteo.provider';
import { InmetProvider } from './infrastructure/adapters/providers/inmet.provider';
import { GetTemperatureUseCase } from './application/use-cases/get-temperature.use-case';
import { ConfigService } from '@nestjs/config';
import { GetWeatherDataHandler } from './infrastructure/controllers/handlers/get-weather-data.handler';

const weatherProviderFactory = {
  provide: WEATHER_PROVIDER_TOKEN,
  useFactory: (configService: ConfigService) => {
    const providerType = configService.get<string>('WEATHER_PROVIDER');
    console.log(providerType);

    if (providerType === 'inmet') {
      return new InmetProvider();
    }
    return new OpenMeteoProvider();
  },
  inject: [ConfigService],
};

@Module({
  providers: [
    weatherProviderFactory,
    GetTemperatureUseCase,
    OpenMeteoProvider,
    InmetProvider,
  ],
  controllers: [GetWeatherDataHandler],
  exports: [GetTemperatureUseCase],
})
export class WeatherDataModule {}
