import {
  BaseEntity,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { Restaurante } from '../restaurante.entity';

@Entity()
export class HorarioFuncionamento extends BaseEntity {
  @PrimaryColumn()
  id_restaurante: number;
  @ManyToOne(
    () => Restaurante,
    restaurante => restaurante.id_restaurante,
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

  @PrimaryColumn()
  dia_semana: number;

  @Column()
  horario_inicio: number;

  @Column()
  horario_fim: number;
}
