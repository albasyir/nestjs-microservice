import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuRepository, MenuService],
  exports: [MenuService],
})
export class MenuModule {}
