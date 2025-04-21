import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MenuModule, OrderModule],
})
export class DomainModule {}
