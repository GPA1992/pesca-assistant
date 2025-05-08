export interface RainHourlyDataEntity {
  hourly: {
    time: string;
    probability: number;
    total: number;
    rain: number;
    showers: number;
  }[];
  targetHour: {
    time: string;
    probability: number;
    total: number;
    rain: number;
    showers: number;
  };
}
