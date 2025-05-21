import { SolunarApiPort } from '../../../../domain/ports/solunar-api.port';
import { SolunarPeriod } from '../../../../domain/entities/solunar-period.entity';

import axios from 'axios';
import { SolunarApiResponse } from './types/solunar-response';
import { SolunarQueryParams } from 'src/modules/solunar-periods/domain/types/solunar-query-params';

export class SolunarApiProvider implements SolunarApiPort {
  async getSolunarData({
    latitude,
    longitude,
    date,
    timezone,
  }: SolunarQueryParams): Promise<SolunarPeriod> {
    const formattedDate = date.replace(/-/g, '');
    const url = `https://api.solunar.org/solunar/${latitude},${longitude},${formattedDate},${timezone}`;
    const result = await axios.get<SolunarApiResponse>(url);

    const { data } = result;
    return SolunarPeriod.create({
      date: new Date(date),
      sunRise: data.sunRise,
      sunTransit: data.sunTransit,
      sunSet: data.sunSet,
      moonRise: data.moonRise,
      moonTransit: data.moonTransit,
      moonUnderfoot: data.moonUnder,
      moonSet: data.moonSet,
      moonPhase: data.moonPhase,
      moonIllumination: data.moonIllumination,
      majorPeriods: [
        { start: data.major1Start, end: data.major1Stop },
        { start: data.major2Start, end: data.major2Stop },
      ],
      minorPeriods: [
        { start: data.minor1Start, end: data.minor1Stop },
        { start: data.minor2Start, end: data.minor2Stop },
      ],
      dayRating: data.dayRating,
      hourlyRating: data.hourlyRating,
    });
  }
}
