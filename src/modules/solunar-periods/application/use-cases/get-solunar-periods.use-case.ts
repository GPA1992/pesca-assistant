import { SolunarApiPort } from '../../domain/ports/solunar-api.port';
import { SolunarPeriod } from '../../domain/entities/solunar-period.entity';
import { SolunarQueryParams } from '../../domain/types/solunar-query-params';
import { Inject } from '@nestjs/common';

export class GetSolunarPeriodsUseCase {
  constructor(
    @Inject('SolunarApiPort')
    private readonly solunarApi: SolunarApiPort,
  ) {}

  async execute(params: SolunarQueryParams): Promise<SolunarPeriod> {
    return this.solunarApi.getSolunarData(params);
  }
}
