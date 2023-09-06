import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryColumn()
  code: number;

  @Column()
  name: string;

  @Column()
  cost_price: number;

  @Column()
  sales_price: number;
}
