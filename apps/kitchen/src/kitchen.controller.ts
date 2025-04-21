import { Controller, Logger } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Order } from 'apps/order/src/order.entity';

@Controller()
export class KitchenController {
  private logger = new Logger(KitchenController.name);

  constructor(private readonly kitchenService: KitchenService) {}

  @RabbitSubscribe({
    exchange: 'orders',
    routingKey: 'created',
    queue: 'order.process',
  })
  handleNewOrder(data: Order) {
    this.kitchenService.cooking(data);
  }
}
