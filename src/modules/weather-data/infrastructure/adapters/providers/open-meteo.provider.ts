import { Injectable } from '@nestjs/common';

import { fetchWeatherApi } from 'openmeteo';

import { OpenMeteoPort } from 'src/modules/weather-data/domain/ports/open-meteo.port';
import {
  WeatherApiResponse,
  WeatherHourlyData,
} from 'src/modules/weather-data/domain/types/weather-api-response';
import { WeatherQueryParams } from 'src/modules/weather-data/domain/types/weather-query-params';

@Injectable()
export class OpenMeteoProvider implements OpenMeteoPort {
  private readonly apiUrl = 'https://api.open-meteo.com/v1/forecast';

  private async fetchData(
    params: WeatherQueryParams,
    variables: string,
  ): Promise<WeatherHourlyData | undefined> {
    const requestParams = {
      latitude: params.latitude,
      longitude: params.longitude,
      hourly: [variables],
    };

    const responses: WeatherApiResponse[] = await fetchWeatherApi(
      this.apiUrl,
      requestParams,
    );
    const response = responses[0];

    const hourly = response.hourly();
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const rawData = hourly?.variables(0)?.valuesArray();

    if (!hourly || !rawData) {
      throw new Error('Dados de hora não disponíveis');
    }
    const times = [
      ...Array(
        (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
      ),
    ].map(
      (_, i) =>
        new Date(
          (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
            1000,
        ),
    );

    const weatherFormated = times?.map((t, index) => ({
      time: t.toISOString(),
      value: rawData[index],
    }));

    const targetTime = params.datetime.getHours();
    const index = times.findIndex((t) => t.getHours() === targetTime);

    return {
      hourly: weatherFormated,
      targetHour: {
        time: new Date(params.datetime).toISOString(),
        value: rawData[index],
      },
    };
  }

  async getTemperature(params: WeatherQueryParams): Promise<WeatherHourlyData> {
    const data = await this.fetchData(params, 'temperature_2m');
    if (!data) {
      throw new Error('Dados de temperatura não disponíveis');
    }
    return data;
  }

  async getHumidity(params: WeatherQueryParams): Promise<WeatherHourlyData> {
    const data = await this.fetchData(params, 'relative_humidity_2m');
    if (!data) {
      throw new Error('Dados de temperatura não disponíveis');
    }
    return data;
  }

  async getPressure(params: WeatherQueryParams): Promise<WeatherHourlyData> {
    const data = await this.fetchData(params, 'surface_pressure');
    if (!data) {
      throw new Error('Dados de temperatura não disponíveis');
    }
    return data;
  }

  async getWindSpeed(params: WeatherQueryParams): Promise<WeatherHourlyData> {
    const data = await this.fetchData(params, 'wind_speed_10m');
    if (!data) {
      throw new Error('Dados de temperatura não disponíveis');
    }
    return data;
  }
}
