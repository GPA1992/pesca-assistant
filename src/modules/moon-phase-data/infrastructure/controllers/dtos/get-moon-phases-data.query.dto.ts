import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class MoonQueryParamsDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Latitude deve ser um número' })
  latitude: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Longitude deve ser um número' })
  longitude: number;

  @IsString({ message: 'O dia precisa ser uma string' })
  targetDay: string;

  @IsString({ message: 'O mes precisa ser uma string' })
  targetMonth: string;

  @IsString({
    message: 'a hora precisa precisa ser um valor inteiro entre 0 e 23',
  })
  targetHour: string;
}
