import { Controller, Logger } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class KitchenController {
  private logger = new Logger(KitchenController.name)

  constructor(private readonly appService: KitchenService) {}

  @RabbitSubscribe({
    exchange: "orders",
    routingKey: "created",
    queue: 'order.process',
  })
  handleNewOrder(data: any) {
    this.logger.log('new order', data);
  }
}
