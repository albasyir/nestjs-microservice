import { PickType } from '@nestjs/swagger';
import { Menu } from '../menu.entity';

export class CreateMenuDto extends PickType(Menu, ['name', 'price']) {}
