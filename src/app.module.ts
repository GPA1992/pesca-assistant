import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherDataModule } from './modules/weather-data/weather-data.module';
import { MoonPhasesDataModule } from './modules/moon-phase-data/moon-phase-.module';
import { SolunarPeriodsModule } from './modules/solunar-periods/solunar-periods.module';
import { RedisModule } from './common/infrastructure/redis/redis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentIngestionModule } from './modules/document-ingestion/document-ingestion.module';
import { AiPromptGeneratorModule } from './modules/ai-prompt-generator/ai-prompt-generator.module';

@Module({
  imports: [
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WeatherDataModule,
    MoonPhasesDataModule,
    SolunarPeriodsModule,
    DocumentIngestionModule,
    AiPromptGeneratorModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
