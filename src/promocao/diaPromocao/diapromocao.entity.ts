import {
    BaseEntity,
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
    Column,
  } from 'typeorm';
import { Promocao } from '../promocao.entity';
  
  @Entity()
  export class DiaPromocao extends BaseEntity {
    @PrimaryColumn()
    id_promocao: number;
    @ManyToOne(
      () => Promocao,
      promocao => promocao.id_promocao,
      {
        onDelete: 'CASCADE',
        cascade: true,
        nullable: false,
      },
    )
    @JoinColumn({
      name: 'id_promocao',
    })
    promocao: Promocao;
  
    @PrimaryColumn()
    dia_semana: number;
  
    @Column()
    horario_inicio: number;
  
    @Column()
    horario_fim: number;
  }
  