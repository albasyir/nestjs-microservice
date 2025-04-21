import { registerAs } from '@nestjs/config';

export const rabbitmqConfigRegistration = registerAs('rabbitmq', () => {
  return {
    host: process.env.RABBIT_HOST || 'rabbitmq',
    port: process.env.RABBIT_PORT || 5672,
    user: process.env.RABBIT_USER || 'rabbitmq',
    pass: process.env.RABBIT_PASS || 'mypassword',
  };
});
