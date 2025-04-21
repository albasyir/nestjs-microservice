import { PickType } from '@nestjs/swagger';
import { Order } from '../order.entity';

export class CreateOrderDto extends PickType(Order, [
  'customerEmail',
  'foodMenus',
]) {}
