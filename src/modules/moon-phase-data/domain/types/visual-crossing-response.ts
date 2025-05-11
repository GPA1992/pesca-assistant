export interface VisualCrossingAstronomyResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: AstronomyDayData[];
}

export interface AstronomyDayData {
  datetime: string; // ex: "2025-05-11"
  sunrise: string; // ex: "06:41:18"
  sunset: string; // ex: "17:42:21"
  moonphase: number; // ex: 0.46
  moonrise?: string; // pode não existir em alguns dias
  moonset?: string; // pode não existir em alguns dias
}
