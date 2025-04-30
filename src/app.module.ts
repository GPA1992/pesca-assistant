import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherDataModule } from './modules/weather-data/weather-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna o ConfigService acessível em qualquer lugar
      envFilePath: '.env', // opcional, padrão é '.env'
    }),
    WeatherDataModule,
  ],
})
export class AppModule {}
