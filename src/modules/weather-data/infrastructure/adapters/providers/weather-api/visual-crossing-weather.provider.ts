import axios, { AxiosResponse } from 'axios';

import { VisualCrossingAstronomyDataEntity } from '../../../../domain/entities/visual-crossing-astronomy-data.entity';
import { VisualCrossingAstronomyPort } from 'src/modules/weather-data/domain/ports/visual-crossing-weather.port';
import { DailyResponseData } from 'src/modules/weather-data/domain/types/day-hourly-response';
import { WeatherQueryParams } from 'src/modules/weather-data/domain/types/weather-query-params';

type VisualCrossingDayResponse = {
  datetime: string;
  sunrise: string;
  sunset: string;
  moonphase: number;
  moonrise?: string;
  moonset?: string;
};

type VisualCrossingApiResponse = {
  days: VisualCrossingDayResponse[];
};

export class VisualCrossingAstronomyProvider
  implements VisualCrossingAstronomyPort
{
  private readonly apiKey = process.env.VISUAL_CROSSING_API_KEY!;

  async getAstronomicalData({
    datetime,
    latitude,
    longitude,
  }: WeatherQueryParams): Promise<
    DailyResponseData<VisualCrossingAstronomyDataEntity>
  > {
    const startDate = new Date(datetime);
    startDate.setDate(startDate.getDate() - 5);

    const endDate = new Date(datetime);
    endDate.setDate(endDate.getDate() + 5);

    const location = `${latitude},${longitude}`;
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${start}/${end}?unitGroup=metric&key=${this.apiKey}&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`;

    const response: AxiosResponse<VisualCrossingApiResponse> =
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
