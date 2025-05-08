export interface MoonPhaseDataEntity {
  daily: {
    date: string;
    value: number;
    description: string;
  }[];
  targetDay: {
    date: string;
    value: number;
    description: string;
  };
}
