/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { GetAstronomicalDataUseCase } from 'src/modules/moon-phase-data/application/use-cases/get-astronomical-data.use-case';
import { GetSolunarPeriodsUseCase } from 'src/modules/solunar-periods/application/use-cases/get-solunar-periods.use-case';
import { GetAllWeatherDataUseCase } from 'src/modules/weather-data/application/use-cases/get-all-weather-data.use-case';
import { GetRainDataUseCase } from 'src/modules/weather-data/application/use-cases/get-rain-data.use-case';

@Injectable()
export class GenerateFishingPromptUseCase {
  constructor(
    private readonly solunarUseCase: GetSolunarPeriodsUseCase,
    private readonly moonUseCase: GetAstronomicalDataUseCase,
    private readonly weatherUseCase: GetAllWeatherDataUseCase,
    private readonly rainUseCase: GetRainDataUseCase,
  ) {}

  async execute(params: {
    latitude: number;
    longitude: number;
    date: Date;
    timezone: number;
  }) {
    const { latitude, longitude, date, timezone } = params;

    const targetDay = date.toISOString().split('T')[0];
    const targetHour = date.getUTCHours();

    const [solunar, moon, weather, rain] = await Promise.all([
      this.solunarUseCase.execute({
        latitude,
        longitude,
        date: targetDay,
        timezone,
      }),
      this.moonUseCase.execute({
        latitude,
        longitude,
        datetime: date,
      }),
      this.weatherUseCase.execute({
        latitude,
        longitude,
        datetime: date,
      }),
      this.rainUseCase.execute({
        latitude,
        longitude,
        datetime: date,
      }),
    ]);

    console.log(solunar);

    const prompt = this.buildPrompt({
      solunar,
      moon,
      weather,
      rain,
      latitude,
      longitude,
      date,
      targetHour,
    });

    return { prompt };
  }

  private buildPrompt(data: any) {
    const {
      solunar,
      moon,
      weather,
      rain,
      latitude,
      longitude,
      date,
      targetHour,
    } = data;

    return `
O pescador irá pescar no dia ${date.toISOString().split('T')[0]} na latitude ${latitude}, longitude ${longitude}, por volta das ${targetHour} horas.

## Condições Climáticas:
- Temperatura (hora alvo): ${weather.targetHour.temperature}°C
- Umidade: ${weather.targetHour.humidity}%
- Pressão: ${weather.targetHour.pressure} hPa
- Vento: ${weather.targetHour.windSpeed} m/s

## Dados de Chuva:
- Probabilidade: ${rain.targetHour.probability}%
- Volume total: ${rain.targetHour.total} mm
- Chuva isolada (showers): ${rain.targetHour.showers} mm

## Dados Lunares:
- Fase da Lua: ${moon.targetDay.moonPhase}
- Nascer do Sol: ${moon.targetDay.sunrise}
- Pôr do Sol: ${moon.targetDay.sunset}
- Nascer da Lua: ${moon.targetDay.moonRise ?? 'Não disponível'}
- Pôr da Lua: ${moon.targetDay.moonSet ?? 'Não disponível'}

## Dados Solunares:
- Major Periods: ${JSON.stringify(solunar.majorPeriods)}
- Minor Periods: ${JSON.stringify(solunar.minorPeriods)}
- Nota do dia: ${solunar.dayRating}
- Nota horária: ${JSON.stringify(solunar.hourlyRating)}

## Análise esperada:
Com base nas condições acima, forneça uma análise detalhada sobre a pescaria para esse dia. Inclua:
- Melhores horários de pesca
- Comportamento dos peixes
- Efeito das condições meteorológicas e lunares
- Estratégias recomendadas
- Considerações específicas para a espécie alvo
`.trim();
  }
}
