import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ConsoleLogger } from '@nestjs/common';
import { KeepAliveStrategy } from '@ourinternal/keep-alive-microservice';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotificationModule, {
    logger: new ConsoleLogger({ prefix: 'Notification' }),
    strategy: new KeepAliveStrategy(),
  });

  await app.listen();
}

bootstrap();
