import { Order } from '../order.entity';
import { IsNumber, Min } from 'class-validator';

export class PaginateOrderDto {
  page: number;
  size: number;
  total: number;

  list: Order[];
}
