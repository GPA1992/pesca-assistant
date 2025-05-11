import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherDataModule } from './modules/weather-data/weather-data.module';
import { MoonPhasesDataModule } from './modules/moon-phase-data/moon-phase-.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WeatherDataModule,
    MoonPhasesDataModule,
  ],
})
export class AppModule {}
