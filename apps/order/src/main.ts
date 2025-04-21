import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule, {
    logger: new ConsoleLogger({ prefix: 'Order' }),
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setVersion(process.env.NODE_ENV || 'unknown')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(3000);
}

bootstrap();
