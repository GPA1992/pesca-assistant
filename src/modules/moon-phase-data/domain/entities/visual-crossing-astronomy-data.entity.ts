export class VisualCrossingAstronomyDataEntity {
  date: string;
  sunrise: string;
  sunset: string;
  moonPhase: number;
  moonRise?: string;
  moonSet?: string;

  constructor(props: {
    date: string;
    sunrise: string;
    sunset: string;
    moonPhase: number;
    moonRise?: string;
    moonSet?: string;
  }) {
    this.date = props.date;
    this.sunrise = props.sunrise;
    this.sunset = props.sunset;
    this.moonPhase = props.moonPhase;
    this.moonRise = props.moonRise;
    this.moonSet = props.moonSet;
  }

  get dayLengthInSeconds(): number {
    const sunrise = this.toDate(this.sunrise);
    const sunset = this.toDate(this.sunset);
    return (sunset.getTime() - sunrise.getTime()) / 1000;
  }

  private toDate(time: string): Date {
    // Adiciona data fictícia apenas para cálculo de diferença
    return new Date(`1970-01-01T${time}`);
  }

  getMoonPhaseDescription(): string {
    const value = this.moonPhase;
    if (value === 0) return 'Lua Nova';
    if (value > 0 && value < 0.25) return 'Crescente Côncava';
    if (value === 0.25) return 'Quarto Crescente';
    if (value > 0.25 && value < 0.5) return 'Crescente Gibosa';
    if (value === 0.5) return 'Lua Cheia';
    if (value > 0.5 && value < 0.75) return 'Minguante Gibosa';
    if (value === 0.75) return 'Quarto Minguante';
    return 'Minguante Côncava';
  }
}
