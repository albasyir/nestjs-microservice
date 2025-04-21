import { Menu } from '../menu.entity';

export class PaginateMenuDto {
  page: number;
  size: number;
  list: Menu[];
} 