import { NestFactory } from '@nestjs/core';
import { KitchenModule } from './kitchen.module';
import { ConsoleLogger } from '@nestjs/common';
import { KeepAliveStrategy } from '@ourinternal/keep-alive-microservice';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(KitchenModule, {
    logger: new ConsoleLogger({ prefix: 'Kitchen' }),
    strategy: new KeepAliveStrategy(),
  });

  await app.listen();
}
bootstrap();
