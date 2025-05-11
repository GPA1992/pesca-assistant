export interface MoonPhaseDataEntity {
  date: string;
  moonPhaseValue: number;
  moonPhaseDescription: string;
  moonIllumination?: number;
  moonAge?: number;
  moonDistance?: number;
  sunrise: Date;
  sunset: Date;
  dayLength: number;
}
