export class WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;

  static create(props: {
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
  }): WeatherData {
    const instance = new WeatherData();
    instance.temperature = props.temperature;
    instance.humidity = props.humidity;
    instance.pressure = props.pressure;
    instance.windSpeed = props.windSpeed;
    return instance;
  }
}
