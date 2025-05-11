import { Injectable, Inject } from '@nestjs/common';
import { OPEN_METEO_PROVIDER_TOKEN } from '../../infrastructure/weather.constants';
import { OpenMeteoPort } from '../../domain/ports/open-meteo.port';
import { WeatherParamsDto } from '../dtos/weather-params.dto';
import { RainHourlyDataEntity } from '../../infrastructure/adapters/providers/entities/rain-hourly.entity';
import { HourlyResponseData } from '../../domain/types/day-hourly-response';

@Injectable()
export class GetRainDataUseCase {
  constructor(
    @Inject(OPEN_METEO_PROVIDER_TOKEN)
    private readonly provider: OpenMeteoPort,
  ) {}

  async execute(
    params: WeatherParamsDto,
  ): Promise<HourlyResponseData<RainHourlyDataEntity>> {
    return await this.provider.getRainData(params);
  }
}
