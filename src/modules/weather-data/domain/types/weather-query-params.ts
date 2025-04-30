import { WeatherSource } from '../enums/weather-source.enum';

export type WeatherDataCreateProps = {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  source: WeatherSource;
};

export type WeatherDataAllProps = WeatherDataCreateProps;

export interface WeatherQueryParams {
  latitude: number;
  longitude: number;
  datetime: Date;
}
