import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule, {
    logger: new ConsoleLogger({ prefix: 'Order' }),
  });

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
}
bootstrap();
