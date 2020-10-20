import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_produto: number;

  @Column({ length: 50 })
  nome: string;

  @Column("decimal", { precision: 10, scale: 2 })
  preco: number;

  @Column({ length: 500 })
  url_foto: string;
}
