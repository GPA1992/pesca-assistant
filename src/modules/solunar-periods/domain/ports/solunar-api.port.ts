import { SolunarPeriod } from '../entities/solunar-period.entity';
import { SolunarQueryParams } from '../types/solunar-query-params';

export interface SolunarApiPort {
  getSolunarData(params: SolunarQueryParams): Promise<SolunarPeriod>;
}
