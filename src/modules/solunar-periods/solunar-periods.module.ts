import { Module } from '@nestjs/common';
import { GetSolunarPeriodsUseCase } from './application/use-cases/get-solunar-periods.use-case';
import { GetSolunarPeriodsHandler } from './infrastructure/controllers/handlers/get-solunar-periods.handler';
import { SolunarApiProvider } from './infrastructure/adapters/providers/solunar-api/solunar-api.provider';

@Module({
  controllers: [GetSolunarPeriodsHandler],
  exports: [GetSolunarPeriodsUseCase],
  providers: [
    GetSolunarPeriodsUseCase,
    {
      provide: 'SolunarApiPort',
      useClass: SolunarApiProvider,
    },
  ],
})
export class SolunarPeriodsModule {}
