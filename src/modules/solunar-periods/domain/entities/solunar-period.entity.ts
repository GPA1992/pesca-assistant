export class SolunarPeriod {
  date: Date;

  sunRise: string;
  sunTransit: string;
  sunSet: string;

  moonRise: string;
  moonTransit: string;
  moonUnderfoot: string;
  moonSet: string;
  moonPhase: string;
  moonIllumination: number;

  majorPeriods: { start: string; end: string }[];
  minorPeriods: { start: string; end: string }[];

  dayRating: number;
  hourlyRating: Record<number, number>;

  static create(data: {
    date: Date;
    sunRise: string;
    sunTransit: string;
    sunSet: string;
    moonRise: string;
    moonTransit: string;
    moonUnderfoot: string;
    moonSet: string;
    moonPhase: string;
    moonIllumination: number;
    majorPeriods: { start: string; end: string }[];
    minorPeriods: { start: string; end: string }[];
    dayRating: number;
    hourlyRating: Record<number, number>;
  }): SolunarPeriod {
    const period = new SolunarPeriod();

    period.date = data.date;
    period.sunRise = data.sunRise;
    period.sunTransit = data.sunTransit;
    period.sunSet = data.sunSet;

    period.moonRise = data.moonRise;
    period.moonTransit = data.moonTransit;
    period.moonUnderfoot = data.moonUnderfoot;
    period.moonSet = data.moonSet;
    period.moonPhase = data.moonPhase;
    period.moonIllumination = data.moonIllumination;

    period.majorPeriods = data.majorPeriods;
    period.minorPeriods = data.minorPeriods;

    period.dayRating = data.dayRating;
    period.hourlyRating = data.hourlyRating;

    return period;
  }
}
