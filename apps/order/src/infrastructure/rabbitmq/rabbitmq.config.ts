import { registerAs } from '@nestjs/config';
import { RabbitMQConfigDto } from './dto/rabbitmq-config.dto';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const rabbitmqConfigRegistration = registerAs('rabbitmq', () => {
  const validatedEnv = plainToClass(RabbitMQConfigDto, process.env);

  const errors = validateSync(validatedEnv);

  if (errors.length > 0) {
    throw new Error(
      `RabbitMQ environment variables validation failed: ${errors
        .map((error) => Object.values(error.constraints || {}))
        .join(', ')}`,
    );
  }

  return {
    host: validatedEnv.RABBIT_HOST,
    port: validatedEnv.RABBIT_PORT,
    user: validatedEnv.RABBIT_USER,
    pass: validatedEnv.RABBIT_PASS,
  };
});
