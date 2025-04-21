import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsBooleanString,
  isString,
  IsBoolean,
} from 'class-validator';

export class TypeORMConfigDto {
  @IsString()
  DB_HOST: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @Transform((v: unknown) => v === true || (isString(v) && v === 'true'))
  @IsOptional()
  @IsBoolean()
  DB_OPTION_MIGRATION_AUTORUN?: boolean;
}
