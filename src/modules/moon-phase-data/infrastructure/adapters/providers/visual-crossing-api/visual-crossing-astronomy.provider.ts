import axios, { AxiosResponse } from 'axios';
import { VisualCrossingAstronomyDataEntity } from 'src/modules/moon-phase-data/domain/entities/visual-crossing-astronomy-data.entity';
import { VisualCrossingAstronomyPort } from 'src/modules/moon-phase-data/domain/ports/visual-crossing-weather.port';
import { MoonPhaseDataResponse } from 'src/modules/moon-phase-data/domain/types/day-response';
import { MoonPhaseQueryParams } from 'src/modules/moon-phase-data/domain/types/moon-phases-query-params';
import { VisualCrossingAstronomyResponse } from './types/visual-crossing-response';

export class VisualCrossingAstronomyProvider
  implements VisualCrossingAstronomyPort
{
  private readonly apiKey = process.env.VISUAL_CROSSING_API_KEY!;

  async getAstronomicalData({
    datetime,
    latitude,
    longitude,
  }: MoonPhaseQueryParams): Promise<MoonPhaseDataResponse> {
    const startDate = new Date(datetime);
    startDate.setDate(startDate.getDate() - 5);

    const endDate = new Date(datetime);
    endDate.setDate(endDate.getDate() + 5);

    const location = `${latitude},${longitude}`;
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${start}/${end}?unitGroup=metric&key=${this.apiKey}&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`;

    const response: AxiosResponse<VisualCrossingAstronomyResponse> =
      await axios.get(url);
    const { days } = response.data;

    const daily = days.map(
      (day) =>
        new VisualCrossingAstronomyDataEntity({
          date: day.datetime,
          sunrise: day.sunrise,
          sunset: day.sunset,
          moonPhase: day.moonphase,
          moonRise: day.moonrise,
          moonSet: day.moonset,
        }),
    );

    const targetDateStr = datetime.toISOString().split('T')[0];
    const targetDay = daily.find((day) => day.date === targetDateStr);

    if (!targetDay) {
      throw new Error(`Dados não encontrados para a data ${targetDateStr}`);
    }

    return { daily, targetDay };
  }
}
