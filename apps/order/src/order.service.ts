import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrderService {
  private logger = new Logger(OrderService.name)

  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) { }
  
  async create() {
    this.logger.log('creating order...');

    this.logger.verbose('saving order...');
    // insert database
    this.logger.verbose('order saved');
    
    this.logger.verbose('broadcasting order...');
    await this.amqpConnection.publish("orders", "created", {
      a: 1
    });
    this.logger.verbose('order broadcasted');

    this.logger.log('order created');
    return 'Order Created';
  }
}
