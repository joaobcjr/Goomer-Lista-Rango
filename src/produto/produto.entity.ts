import { Categoria } from 'src/categoria/categoria.entity';
import { Restaurante } from 'src/restaurante/restaurante.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @Column({ select: false })
  id_categoria: number;
  @ManyToOne(() => Categoria,categoria => categoria.id_categoria,
    {
      onDelete: 'CASCADE',
      cascade: true,
      nullable: false,
      
    },
  )
  @JoinColumn({
    name: 'id_categoria',
  })
  categoria: Categoria;

  @Column({ select: false })
  id_restaurante: number;
  @ManyToOne(() => Restaurante,restaurante => restaurante.id_restaurante,
    {
      onDelete: 'CASCADE',
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'id_restaurante',
  })
  restaurante: Restaurante;
}
