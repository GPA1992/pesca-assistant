export class WeatherData {
  constructor(
    public readonly time: string,
    public readonly temperature: number,
    public readonly humidity: number,
    public readonly pressure: number,
    public readonly windSpeed: number,
  ) {}

  static create(props: {
    time: string;
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
  }): WeatherData {
    return new WeatherData(
      props.time,
      props.temperature,
      props.humidity,
      props.pressure,
      props.windSpeed,
    );
  }
}
