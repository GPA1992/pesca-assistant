import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsString, IsNumber } from 'class-validator';

export class GetSolunarPeriodsQueryDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsString()
  date: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Timezone deve ser um número inteiro' })
  timezone: number;
}
