import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order, OrderStatus } from './order.entity';
import { v7 } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class OrderService {
  private logger = new Logger(OrderService.name);

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly orderRepository: OrderRepository,
    private readonly menuService: MenuService,
  ) {}

  /**
   * create new order
   *
   */
  async create(newOrder: CreateOrderDto) {
    this.logger.log('creating order...');

    //
    //  validating menu
    //
    this.logger.verbose('validating ordered menus...');
    const orderedMenuIds = newOrder.orderedMenu.map((menu) => menu.id);
    const existingMenus = await this.menuService.findByIds(orderedMenuIds);

    if (existingMenus.length !== orderedMenuIds.length) {
      this.logger.error('One or more ordered menus do not exist');
      throw new BadRequestException('One or more ordered menus do not exist');
    }
    this.logger.verbose('all ordered menus validated');

    //
    // saving order
    //
    this.logger.verbose('saving order...');

    const foodMenusMapped: Order['foodMenus'] = existingMenus.map((menu) => {
      return {
        ...menu,
        qty:
          newOrder.orderedMenu.find((orderedMenu) => orderedMenu.id === menu.id)
            ?.qty || 0,
      };
    });

    const createdOrder: Order = await this.orderRepository.save({
      id: v7(),
      customerEmail: newOrder.customerEmail,
      foodMenus: foodMenusMapped,
    });
    this.logger.verbose('order saved');

    //
    // broadcasting
    //
    this.logger.verbose('broadcasting order...');
    await this.amqpConnection.publish('orders', 'created', createdOrder);
    this.logger.verbose('order broadcasted');

    //
    // done
    //
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
