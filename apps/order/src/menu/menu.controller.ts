import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Logger,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './menu.entity';
import { PaginateMenuDto } from './dto/paginate-menu.dto';
import { PaginateMenuQueryDto } from './dto/paginate-menu-query.dto';

@Controller('menu')
export class MenuController {
  private logger = new Logger(MenuController.name);

  constructor(private readonly menuService: MenuService) {}

  /**
   * create new menu
   */
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    this.logger.log('creating menu...');
    const menu = await this.menuService.create(createMenuDto);
    this.logger.log('menu created');
    return menu;
  }

  /**
   * get menu list with pagination
   */
  @Get()
  async findAll(
    @Query() query: PaginateMenuQueryDto,
  ): Promise<PaginateMenuDto> {
    this.logger.log('finding all menus...');
    const result = await this.menuService.paginate(query);
    this.logger.log('menus found');
    return result;
  }

  /**
   * get spesific menu
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Menu> {
    this.logger.log(`finding menu with ID ${id}...`);
    const menu = await this.menuService.findOne(id);
    if (!menu) throw new NotFoundException("menu isn't found");
    this.logger.log(`menu with ID ${id} found`);
    return menu;
  }

  /**
   * update menu
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    this.logger.log(`updating menu with ID ${id}...`);
    const menu = await this.menuService.update(id, updateMenuDto);
    if (!menu) throw new NotFoundException('menu not found');
    this.logger.log(`menu with ID ${id} updated`);
    return menu;
  }

  /**
   * delete menu
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Menu> {
    this.logger.log(`removing menu with ID ${id}...`);
    const menu = await this.menuService.remove(id);
    if (!menu) throw new NotFoundException("menu isn't found");
    this.logger.log(`menu with ID ${id} removed`);
    return menu;
  }
}
