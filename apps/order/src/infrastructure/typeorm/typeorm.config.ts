import { registerAs } from '@nestjs/config';

export const typeormConfigRegistration = registerAs('typeorm', () => {
  return {
    host: process.env.DB_HOST || 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || 'mypassword',
    name: process.env.DB_NAME || 'mydatabase',
    options: {
      migration: {
        autoRun:
          process.env.DB_OPTION_MIGRATION_AUTORUN === 'true' ? true : false,
      },
    },
  };
});
