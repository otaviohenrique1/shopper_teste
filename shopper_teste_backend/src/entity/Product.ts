import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryColumn()
  code: number;

  @Column()
  name: string;

  @Column()
  cost_price: number;

  @Column({ type: "decimal", })
  sales_price: number;
}
