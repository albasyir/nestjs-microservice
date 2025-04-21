import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { PaginateOrderDto } from './dto/paginate-order.dto';
import { PaginateOrderQueryDto } from './dto/paginate-order-query.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  /**
   * get order list with pagination
   */
  @Get()
  async paginate(
    @Query() query: PaginateOrderQueryDto,
  ): Promise<PaginateOrderDto> {
    return this.orderService.paginate(query);
  }

  /**
   * create new order
   */
  @Post()
  async create(@Body() data: CreateOrderDto): Promise<Order> {
    return this.orderService.create(data);
  }
}
