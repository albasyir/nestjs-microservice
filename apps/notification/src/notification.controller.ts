import { Controller, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Order } from 'apps/order/src/order.entity';

@Controller()
export class NotificationController {
  private logger = new Logger(NotificationController.name);

  constructor(private readonly notificationService: NotificationService) {}

  @RabbitSubscribe({
    exchange: 'orders',
    routingKey: 'created',
    queue: 'order.confirmation',
  })
  async getNewOrder(data: Order): Promise<void> {
    await this.notificationService.broadcastNewOrder(data);
  }
}
