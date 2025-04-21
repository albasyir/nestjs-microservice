import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Menu {
  /**
   * primary key (UUID)
   */
  @IsUUID()
  @PrimaryColumn()
  id: string;

  /**
   * name
   */
  @IsString()
  @Column()
  name: string;

  /**
   * price
   */
  @Type(() => Number)
  @IsNumber()
  @Column('decimal')
  price: number;
}
