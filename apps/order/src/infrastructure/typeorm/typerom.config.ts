import { registerAs } from "@nestjs/config";

export const typeormConfigRegistration = registerAs('typeorm', () => {
  return {
    host: process.env.DATABASE_HOST || 'mysql',
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER || 'root',
    pass: process.env.DATABASE_PASS || 'mypassword',
  }
});