// rain-data.entity.ts
export class RainData {
  constructor(
    public readonly time: string,
    public readonly probability: number,
    public readonly total: number,
    public readonly rain: number,
    public readonly showers: number,
  ) {}

  static create(props: {
    time: string;
    probability: number;
    total: number;
    rain: number;
    showers: number;
  }): RainData {
    return new RainData(
      props.time,
      props.probability,
      props.total,
      props.rain,
      props.showers,
    );
  }
}
