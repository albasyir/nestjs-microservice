import { Logger, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { OrderRepository } from './order.repository';

@Module({
  imports: [InfrastructureModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
