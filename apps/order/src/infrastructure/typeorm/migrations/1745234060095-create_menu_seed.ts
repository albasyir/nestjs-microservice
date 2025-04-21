import { MigrationInterface, QueryRunner } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

export class CreateMenuSeed1745234060095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('menu')
      .values([
        { id: uuidv7(), name: 'Pizza', price: 9 },
        { id: uuidv7(), name: 'Burger', price: 5 },
        { id: uuidv7(), name: 'Pasta', price: 7 },
        { id: uuidv7(), name: 'Salad', price: 4 },
        { id: uuidv7(), name: 'Sushi', price: 12 },
        { id: uuidv7(), name: 'Steak', price: 19 },
        { id: uuidv7(), name: 'Tacos', price: 3 },
        { id: uuidv7(), name: 'Sandwich', price: 6 },
        { id: uuidv7(), name: 'Soup', price: 4 },
        { id: uuidv7(), name: 'Ice Cream', price: 2 },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('menu')
      .where('name IN (:...names)', {
        names: [
          'Pizza',
          'Burger',
          'Pasta',
          'Salad',
          'Sushi',
          'Steak',
          'Tacos',
          'Sandwich',
          'Soup',
          'Ice Cream',
        ],
      })
      .execute();
  }
}
