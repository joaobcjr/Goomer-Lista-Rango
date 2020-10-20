import { Produto } from 'src/produto/produto.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DiaPromocao } from './diaPromocao/diapromocao.entity';

@Entity()
export class Promocao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_promocao: number;

  @Column({ length: 50 })
  descricao: string;

  @Column({})
  status: number;

  @Column("decimal", { precision: 10, scale: 2 })
  preco: number;

  @Column()
  id_produto: number;
  @ManyToOne(() => Produto,produto => produto.id_produto,
    {
      onDelete: 'CASCADE',
      cascade: true,
      nullable: false,
      
    },
  )
  @JoinColumn({
    name: 'id_produto',
  })
  produto: Produto;

  @OneToMany(
    () => DiaPromocao,
    diaPromocao => diaPromocao.id_promocao,
    {
      onDelete: 'CASCADE',
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'id_promocao',
  })
  diaPromocao: DiaPromocao[];
}
