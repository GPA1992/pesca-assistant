export interface HourlyResponseData<T> {
  hourly: T[];
  targetHour: T;
}

export interface DailyResponseData<T> {
  daily: T[];
  targetDay: T;
}
