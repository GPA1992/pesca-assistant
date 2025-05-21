import { Injectable } from '@nestjs/common';
import { fetchWeatherApi } from 'openmeteo';
import { OpenMeteoPort } from 'src/modules/weather-data/domain/ports/open-meteo.port';
import { WeatherQueryParams } from 'src/modules/weather-data/domain/types/weather-query-params';
import { WeatherHourlyDataInterface } from '../entities/weather-hourly.entity';
import { RainHourlyDataInterface } from '../entities/rain-hourly.entity';
import { HourlyResponseData } from 'src/modules/weather-data/domain/types/day-hourly-response';
import { WeatherApiResponse } from './types/weather-api-response';
import { WeatherData } from 'src/modules/weather-data/domain/entities/weather-data.entity';

@Injectable()
export class OpenMeteoProvider implements OpenMeteoPort {
  private readonly apiUrl = 'https://api.open-meteo.com/v1/forecast';

  private async fetchData(
    params: WeatherQueryParams,
    variables: string,
  ): Promise<HourlyResponseData<WeatherHourlyDataInterface> | undefined> {
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

  async getAllWeatherData(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<WeatherData>> {
    const requestParams = {
      latitude: params.latitude,
      longitude: params.longitude,
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'surface_pressure',
        'wind_speed_10m',
      ],
    };

    const responses = await fetchWeatherApi(this.apiUrl, requestParams);
    const response = responses[0];
    const hourly = response.hourly();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    if (!hourly) {
      throw new Error('Dados meteorológicos não disponíveis');
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

    const temperature = hourly.variables(0)?.valuesArray() ?? [];
    const humidity = hourly.variables(1)?.valuesArray() ?? [];
    const pressure = hourly.variables(2)?.valuesArray() ?? [];
    const windSpeed = hourly.variables(3)?.valuesArray() ?? [];

    const hourlyData = times.map((time, i) => ({
      time,
      temperature: temperature[i],
      humidity: humidity[i],
      pressure: pressure[i],
      windSpeed: windSpeed[i],
    }));

    const targetHour = params.datetime.getUTCHours();
    const index = times.findIndex(
      (t) => new Date(t).getUTCHours() === targetHour,
    );

    return {
      hourly: hourlyData,
      targetHour: hourlyData[index],
    };
  }

  async getRainData(
    params: WeatherQueryParams,
  ): Promise<HourlyResponseData<RainHourlyDataInterface>> {
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
