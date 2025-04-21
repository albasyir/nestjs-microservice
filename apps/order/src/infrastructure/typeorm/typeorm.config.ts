import { registerAs } from '@nestjs/config';
import { TypeORMConfigDto } from './dto/typeorm-config.dto';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const typeormConfigRegistration = registerAs('typeorm', () => {
  const validatedEnv = plainToClass(TypeORMConfigDto, process.env);

  const errors = validateSync(validatedEnv);

  if (errors.length > 0) {
    throw new Error(
      `Environment variables validation failed: ${errors
        .map((error) => Object.values(error.constraints || {}))
        .join(', ')}`,
    );
  }

  return {
    host: validatedEnv.DB_HOST,
    port: validatedEnv.DB_PORT,
    user: validatedEnv.DB_USER,
    pass: validatedEnv.DB_PASS,
    name: validatedEnv.DB_NAME,
    options: {
      migration: {
        autoRun: validatedEnv.DB_OPTION_MIGRATION_AUTORUN,
      },
    },
  };
});
