import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 50 })
  descricao: string;
}
