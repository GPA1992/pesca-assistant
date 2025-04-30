import { WeatherSource } from '../enums/weather-source.enum';
import {
  WeatherDataAllProps,
  WeatherDataCreateProps,
} from '../types/weather-query-params';

export class WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  source: WeatherSource;

  private constructor(props: WeatherDataAllProps) {
    Object.assign(this, props);
  }

  static create(props: WeatherDataCreateProps): WeatherData {
    return new WeatherData({ ...props });
  }

  static reconstruct(props: WeatherDataAllProps): WeatherData {
    return new WeatherData({ ...props });
  }
}
