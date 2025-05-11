import { Controller, Get, Query } from '@nestjs/common';
import { GetSolunarPeriodsUseCase } from '../../../application/use-cases/get-solunar-periods.use-case';
import { GetSolunarPeriodsQueryDto } from '../dtos/get-solunar-periods.query.dto';

@Controller('solunar-periods')
export class GetSolunarPeriodsHandler {
  constructor(
    private readonly getSolunarPeriodsUseCase: GetSolunarPeriodsUseCase,
  ) {}

  @Get()
  async handle(@Query() query: GetSolunarPeriodsQueryDto) {
    return this.getSolunarPeriodsUseCase.execute(query);
  }
}
