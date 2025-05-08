export type HourlyDayWeatherData = { time: string; value: number };
export interface WeatherHourlyDataEntity {
  hourly: HourlyDayWeatherData[];
  targetHour: HourlyDayWeatherData;
}
