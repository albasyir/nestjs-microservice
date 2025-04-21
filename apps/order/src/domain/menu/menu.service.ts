import { Injectable, Logger } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { Menu } from './menu.entity';
import { v7 } from 'uuid';
import { PaginateMenuDto } from './dto/paginate-menu.dto';
import { PaginateMenuQueryDto } from './dto/paginate-menu-query.dto';
import { In } from 'typeorm';

@Injectable()
export class MenuService {
  private logger = new Logger(MenuService.name);

  constructor(private readonly menuRepository: MenuRepository) {}

  async create(createMenuDto: Pick<Menu, 'name' | 'price'>): Promise<Menu> {
    this.logger.log('creating menu...');

    this.logger.verbose('saving menu...');
    const createdMenu = await this.menuRepository.save({
      id: v7(),
      ...createMenuDto,
    });
    this.logger.verbose('menu saved');

    this.logger.log('menu created');
    return createdMenu;
  }

  async paginate(query: PaginateMenuQueryDto): Promise<PaginateMenuDto> {
    this.logger.log('finding all menus...');
    const [menus] = await this.menuRepository.findAndCount({
      skip: (query.page - 1) * query.size,
      take: query.size,
    });
    this.logger.log('menus found');
    return {
      page: query.page,
      size: query.size,
      list: menus,
    };
  }

  async findOne(id: string): Promise<Menu | undefined> {
    this.logger.log(`finding menu with ID ${id}...`);
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) return;
    this.logger.log(`menu with ID ${id} found`);
    return menu;
  }

  async findByIds(ids: string[]): Promise<Menu[]> {
    this.logger.log(`finding menus with IDs: ${ids.join(', ')}...`);

    const menus = await this.menuRepository.findBy({
      id: In(ids),
    });

    if (menus.length === 0) {
      this.logger.verbose('no menus found');
    } else {
      this.logger.verbose(`found ${menus.length} menus`);
    }

    return menus;
  }

  async update(
    id: string,
    updateMenuDto: Partial<Menu>,
  ): Promise<Menu | undefined> {
    this.logger.log(`updating menu with ID ${id}...`);

    this.logger.verbose('finding menu...');
    const menu = await this.findOne(id);
    if (!menu) return;
    this.logger.verbose('menu found');

    this.logger.verbose('updating menu...');
    Object.assign(menu, updateMenuDto);
    const updatedMenu = await this.menuRepository.save(menu);
    this.logger.verbose('menu updated');

    this.logger.log(`menu with ID ${id} updated`);
    return updatedMenu;
  }

  async remove(id: string): Promise<void | Menu> {
    this.logger.log(`removing menu with ID ${id}...`);

    this.logger.verbose('finding menu...');
    const menu = await this.findOne(id);

    if (!menu) return;
    this.logger.verbose('menu found');

    this.logger.verbose('removing menu...');
    await this.menuRepository.remove(menu);
    this.logger.verbose('menu removed');

    this.logger.log(`menu with ID ${id} removed`);
    return menu;
  }
}
