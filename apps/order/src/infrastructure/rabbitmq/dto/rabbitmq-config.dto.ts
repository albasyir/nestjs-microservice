import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class RabbitMQConfigDto {
  @IsString()
  RABBIT_HOST: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  RABBIT_PORT: number;

  @IsString()
  RABBIT_USER: string;

  @IsString()
  RABBIT_PASS: string;
}
