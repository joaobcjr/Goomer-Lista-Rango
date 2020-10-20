/* eslint-disable @typescript-eslint/class-name-casing */
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurante extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_restaurante: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 100 })
  endereco: string;

  @Column({ length: 500 })
  url_foto: string;
}
