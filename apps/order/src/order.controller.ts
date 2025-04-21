import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Order } from './order.entity';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * redirect to documentation
   */
  @Get()
  @Redirect('/docs')
  @ApiExcludeEndpoint()
  redirect() {}

  /**
   * create new order
   */
  @Post()
  async create(@Body() data: CreateOrderDto): Promise<Order> {
    return this.orderService.create(data);
  }
}
