import { Injectable } from '@nestjs/common';

import { fetchWeatherApi } from 'openmeteo';

import { OpenMeteoPort } from 'src/modules/weather-data/domain/ports/open-meteo.port';
import {
  RainHourlyData,
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

  async getRainData(params: WeatherQueryParams): Promise<RainHourlyData> {
    const requestParams = {
      latitude: params.latitude,
      longitude: params.longitude,
      hourly: ['precipitation_probability', 'precipitation', 'rain', 'showers'],
    };

    const responses = await fetchWeatherApi(this.apiUrl, requestParams);
    const response = responses[0];
    const hourly = response.hourly();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    if (!hourly) {
      throw new Error('Dados de precipitação não disponíveis');
    }

    const timeStart = Number(hourly.time());
    const interval = hourly.interval();
    const times = Array.from({
      length: (Number(hourly.timeEnd()) - timeStart) / interval,
    }).map((_, i) =>
      new Date(
        (timeStart + i * interval + utcOffsetSeconds) * 1000,
      ).toISOString(),
    );

    const probability = hourly.variables(0)?.valuesArray() ?? [];
    const total = hourly.variables(1)?.valuesArray() ?? [];
    const rain = hourly.variables(2)?.valuesArray() ?? [];
    const showers = hourly.variables(3)?.valuesArray() ?? [];

    const hourlyData = times.map((time, i) => ({
      time,
      probability: probability[i],
      total: total[i],
      rain: rain[i],
      showers: showers[i],
    }));

    const targetHour = params.datetime.getUTCHours();
    const index = times.findIndex(
      (t) => new Date(t).getUTCHours() === targetHour,
    );

    if (index === -1) {
      throw new Error('Hora alvo não encontrada nos dados');
    }

    return {
      hourly: hourlyData,
      targetHour: hourlyData[index],
    };
  }
}
