import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { Order } from 'apps/order/src/domain/order/order.entity';

@Injectable()
export class KitchenService {
  private logger = new Logger(KitchenService.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  cooking(order: Order): void {
    this.logger.log(`set job order ${order.id}`);

    // fake job feel like real, should use bullmq for good architecture
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(async () => {
      this.logger.log(`processing order ${order.id}`);
      await this.amqpConnection.publish('amq.direct', 'cooking', order);
      this.logger.log(`processed order ${order.id}`);
    }, 5000);

    this.logger.log(`job is ready ${order.id}`);
  }
}
