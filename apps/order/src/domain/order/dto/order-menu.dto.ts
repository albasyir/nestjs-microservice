import { IsNumber, IsUUID } from 'class-validator';
import { Order } from '../order.entity';

export class OrderMenu {
  @IsUUID()
  id: Order['id'];

  @IsNumber()
  qty: number;
}
