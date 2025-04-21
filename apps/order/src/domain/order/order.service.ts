import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order, OrderStatus } from './order.entity';
import { v7 } from 'uuid';

@Injectable()
export class OrderService {
  private logger = new Logger(OrderService.name);

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly orderRepository: OrderRepository,
  ) {}

  /**
   * create new order
   *
   */
  async create(newOrder: Pick<Order, 'foodMenus' | 'customerEmail'>) {
    this.logger.log('creating order...');

    this.logger.verbose('saving order...');
    const createdOrder: Order = await this.orderRepository.save({
      id: v7(),
      ...newOrder,
    });
    this.logger.verbose('order saved');

    this.logger.verbose('broadcasting order...');
    await this.amqpConnection.publish('orders', 'created', createdOrder);
    this.logger.verbose('order broadcasted');

    this.logger.log('order created');
    return createdOrder;
  }

  /**
   * set order as processed
   *
   */
  async setOrderAsProcessed(order: Pick<Order, 'id'>): Promise<Order> {
    this.logger.log(
      `changing order ${order.id} status to ${OrderStatus.PROCESSED}`,
    );

    const updatedOrderStatus: Order = await this.orderRepository.save({
      id: order.id,
      status: OrderStatus.PROCESSED,
    });

    this.logger.log(
      `order ${updatedOrderStatus.id} status changed to ${updatedOrderStatus.status}`,
    );

    return updatedOrderStatus;
  }
}
