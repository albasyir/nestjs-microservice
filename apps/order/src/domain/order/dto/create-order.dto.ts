import { PickType } from '@nestjs/swagger';
import { Order } from '../order.entity';
import { OrderMenu } from './order-menu.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto extends PickType(Order, ['customerEmail']) {
  @Type(() => OrderMenu)
  orderedMenu: OrderMenu[];
}
