import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Injectable()
export class OrderRabbitMQ {
  private logger = new Logger(OrderRabbitMQ.name);
  constructor(private readonly orderService: OrderService) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'cooking',
    queue: 'order.main',
  })
  async orderCooking(order: Order) {
    this.logger.log(`just know that order ${order.id} has been processed`);
    await this.orderService.setOrderAsProcessed(order);
  }
}
