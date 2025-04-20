import { Controller, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class NotificationController {
  private logger = new Logger(NotificationController.name)

  constructor(private readonly notificationService: NotificationService) {}

  @RabbitSubscribe({
    exchange: "orders",
    routingKey: "created",
    queue: 'order.confirmation',
  })
  getHello(data): void | Promise<void> {
    this.logger.log('new order', data);
  
  }
}
