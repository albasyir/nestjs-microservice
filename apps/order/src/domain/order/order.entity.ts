import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { Menu } from '../menu/menu.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
}

@Entity()
export class Order {
  /**
   * primary key (UUID)
   */
  @PrimaryColumn()
  id: string;

  /**
   * menu that ordered
   */
  @Column('json')
  foodMenus: Array<
    Menu & {
      qty: number;
    }
  >;

  /**
   * customer email
   *
   * @example aziz@mycandidate.com
   */
  @Column()
  customerEmail: string;

  /**
   * status of the order
   *
   * @example pending
   */
  @Column({
    type: 'varchar',
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  /**
   * when order created
   *
   */
  @CreateDateColumn()
  createdAt: Date;
}
