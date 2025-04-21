import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderRabbitMQ } from './order.rabbitmq';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderRabbitMQ, OrderService, OrderRepository],
})
export class OrderModule {}
