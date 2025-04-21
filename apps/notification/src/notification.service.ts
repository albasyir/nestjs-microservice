import { Injectable, Logger } from '@nestjs/common';
import { Order } from 'apps/order/src/order.entity';

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);

  async broadcastNewOrder(order: Order): Promise<void> {
    this.logger.log(`sending email to ${order.customerEmail}`);

    // fake process, can be direct call or job for 100% sure
    await new Promise((res) => {
      this.logger.verbose(order);
      setTimeout(res, 1500);
    });

    this.logger.log(`email sent to ${order.customerEmail}`);
  }
}
