import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { OrderRepository } from './order.repository';
import { OrderRabbitMQ } from './order.rabbitmq';

@Module({
  imports: [InfrastructureModule],
  controllers: [OrderController],
  providers: [OrderRabbitMQ, OrderService, OrderRepository],
})
export class OrderModule {}
