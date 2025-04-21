import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderRabbitMQ } from './order.rabbitmq';
import { OrderService } from './order.service';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [MenuModule],
  controllers: [OrderController],
  providers: [OrderRabbitMQ, OrderService, OrderRepository],
})
export class OrderModule {}
